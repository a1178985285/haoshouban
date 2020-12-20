<template>
  <div class="OrderNotSignedIn-container">
    <div class="HistoricalOrder-container">
      <div class="IncomeDetails_task liuui_width">订单详情</div>

      <div class="HistoricalOrder-hotel">
        <div
          class="every-HistoricalOrder"
          v-for="(orderItem,orderIndex) in orderList"
          :key="orderIndex"
        >
          <div class="every-HistoricalOrder-meta">
            <p
              class="every-HistoricalOrder-meta-text"
              style="font-size: 36rpx;"
            >{{orderItem.hotelName}}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 1"
            >{{ orderItem.orderStatus == 1 ? '审核拒绝' : '' }}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 0"
            >{{ orderItem.orderStatus == 0 ? '待审核' : '' }}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 4"
            >{{ orderItem.orderStatus == 4 ? '已取消' : '' }}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 2"
            >{{ orderItem.orderStatus == 2 ? '执行中' : '' }}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 5"
            >{{ orderItem.orderStatus == 5 ? '完成' : '' }}</p>
            <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 5"
            >{{ orderItem.orderStatus == 3 ? '待支付' : '' }}</p>
            <!-- <p
              class="every-HistoricalOrder-meta-status"
              v-show="orderItem.orderStatus == 6"
            >{{ orderItem.orderStatus == 6 ? '未接单' : '' }}</p> -->
          </div>
          <div class="every-HistoricalOrder-address">
            <span class="cir" style="margin-top:0rpx"></span>
            <p style="font-size:26rpx;">朝阳区北沙滩大屯路甲一号</p>
          </div>
          <div class="every-HistoricalOrder-addresses">
            <div>
              <div
                v-for="(item,index) in orderItem.missionContent.room"
                :key="index"
                style="display:flex;"
              >
                <span class="cir" style="margin-top:12rpx"></span>

                <p
                  style="font-size:26rpx;"
                >{{item.roomType}}{{item.number}}间&nbsp;|&nbsp; 单价/￥{{item.price}}</p>
              </div>
            </div>
          </div>
          <div class="every-HistoricalOrder-income">
            <p>
              <img src="/static/images/file/shouru.svg" style="font-size:26rpx;" class="timeimg" />
              总收入{{ orderItem.estimatedIncome ? orderItem.estimatedIncome : '0' }}元
            </p>
          </div>

          <div class="every-HistoricalOrder-income">
            <p>任务时间:{{ orderItem.missionContent.missionStart}}至{{ orderItem.missionContent.missionEnd}}</p>
          </div>

          <div class="every-HistoricalOrder-button">
            <div class="CancellationOfOrder" @click="CancelTheOrder(orderItem.id)">
              <p>取消订单</p>
            </div>
            <div class="UploadBills" @click="upload" :data-id="orderItem.id">
              <p>上传纸质对账单</p>
            </div>
            <div class="ShareOrder" @click="share" :data-id="orderItem.id">
              <p>分享订单</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Order-state">
      <p class="Order-state-meta" v-show="sign==0&&sign==1">暂无订单</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sign: null,
      orderList: [],
      pages: 1
    };
  },
  mounted() {
    const USER_DATA = wx.getStorageSync("data").member;
    this.sign = USER_DATA.sign;

    this.$http
      .post({
        url: "/order/myOrderList",
        data: {
          page: 1,
          limit: 5,
          memberId: USER_DATA.id
        }
      })
      .then(res => {
        this.orderList = res.data.record;
        console.log(this.orderList);
        for (let i = 0; i < this.orderList.length; i++) {
          this.orderList[i].missionContent = JSON.parse(
            this.orderList[i].missionContent
          );
        }
        console.log("存放");
        console.log(this.orderList);
      });
  },
  //上拉加载更多

  methods: {
    jumpSigning() {
      console.log(this.sign);
      if (this.sign == 0) {
        wx.navigateTo({
          url: "../Signing/main"
        });
      }
    },
    upload(e) {
      let id = e.currentTarget.dataset.id;
      console.log(id);
      wx.navigateTo({
        url: "../UploadStatement/main?id=" + id
      });
    },
    CancelTheOrder(ips) {
      console.log(ips);
      let ids = ips;
      console.log(ips);
      this.$http
        .post({
          url: "/order/cancelOrder",
          data: {
            id: ids
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    share(e) {
      let ids = e.currentTarget.dataset.id;
      this.$http
        .post({
          url: "/order/shareOrder",
          data: {
            id: ids,
            memberId: wx.getStorageSync("data").member.id
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  onReachBottom: function() {
    let _this = this;
    this.pages++;
    console.log(this);
    // this.$options.moreData(this.pages)
    this.$http
      .post({
        url: "/order/myOrderList",
        data: {
          page: _this.pages,
          limit: 5,
          memberId: 1
        }
      })
      .then(res => {
        console.log("存折");
        for (var i = 0; i < res.data.record.length; i++) {
          res.data.record[i].missionContent = JSON.parse(
            res.data.record[i].missionContent
          );
          _this.orderList.push(res.data.record[i]);
        }
      });
  }
};
</script>

<style>
.IncomeDetails_task {
  margin-top: 26rpx;
  height: 54rpx;
  line-height: 54rpx;
  color: #febd00;
  font-size: 36rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
  font-weight: 700;
  position: relative;
}
.IncomeDetails_task::after {
  content: "";
  width: 6rpx;
  height: 40rpx;
  position: absolute;
  top: 9rpx;
  left: 0;
  background: #febd00;
}
.Signing-state {
  width: 100%;
  height: 158rpx;
  background: #414143;
  color: #ffffff;
  display: flex;
  font-size: 32rpx;
  align-items: center;
}
.Signing-state-meta {
  margin-left: 328rpx;
  line-height: 158rpx;
  display: inline-block;
  width: 150rpx;
}
.Signing-state-button {
  margin: 0rpx 30rpx 0 160rpx;
  width: 150rpx;
  height: 60rpx;
  background: #f15e3e;
  line-height: 60rpx;
  border-radius: 8rpx;
  background-color: rgba(241, 94, 62, 1);
  text-align: center;
  border: 2rpx solid rgba(255, 255, 255, 0);
}
.Signing-state-button p {
  line-height: 60rpx;
}
.Order-meta {
  display: flex;
  margin-top: 28rpx;
}
.paragraph {
  width: 2rpx;
  height: 54rpx;
  background: #febd00;
  margin-left: 40rpx;
}
.Order-meta-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.Order-state {
  width: 750rpx;
  height: 56rpx;
  margin-top: 52rpx;
}
.Order-state-meta {
  display: inline-block;
  margin-left: 306rpx;
  font-size: 30rpx;
  color: #878787;
}
.Order-explain {
  width: 750rpx;
  height: 48rpx;
  margin-top: 260rpx;
}
.Order-explain-meta {
  margin-left: 134rpx;
  display: inline-block;
  font-size: 28rpx;
  color: #ff0000;
}
.IncomeDetails_task {
  margin-top: 26rpx;
  height: 54rpx;
  line-height: 54rpx;
  color: #febd00;
  font-size: 36rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
  font-weight: 700;
  position: relative;
}
.IncomeDetails_task::after {
  content: "";
  width: 6rpx;
  height: 40rpx;
  position: absolute;
  top: 9rpx;
  left: 0;
  background: #febd00;
}
.HistoricalOrder-meta {
  display: flex;
}
.paragraph {
  width: 6rpx;
  height: 40rpx;
  margin-top: 7rpx;
  background: #febd00;
  margin-left: 40rpx;
}
.HistoricalOrder-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.HistoricalOrder-hotel {
  width: 692rpx;
  height: auto;
  margin-top: 60rpx;

  margin-left: 28rpx;
}
.every-HistoricalOrder {
  width: 100%;
  height: 264rpx;
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20rpx 0;
  box-sizing: border-box;
  border-radius: 4rpx;
  box-shadow: 0px 0px 4rpx 0px rgba(108, 108, 108, 0.4);
  border: 2rpx solid rgba(255, 255, 255, 0);
}
.every-HistoricalOrder-meta {
  font-size: 30rpx;
  display: flex;
  margin-left: 26rpx;
  margin-top: -10rpx;
  justify-content: space-between;
}
.every-HistoricalOrder-meta-text {
  color: #101010;
  font-family: -apple-system;
}
.every-HistoricalOrder-meta-status {
  /* font-size: 24rpx; */
  color: #878787;
  font-family: -apple-system;
  margin-right: 26rpx;
}
.every-HistoricalOrder-time {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
}
.HistoricalOrder-room {
  margin-left: 30rpx;
}
.every-HistoricalOrder-income {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
  display: flex;
  justify-content: left;
  align-items: center;
}
.every-HistoricalOrder-address {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
  display: flex;
  align-items: center;
  justify-content: left;
}
.every-HistoricalOrder-button {
  display: flex;
  font-size: 24rpx;
}
.CancellationOfOrder {
  width: 118rpx;
  height: 38rpx;
  background: #ffd21f;
  color: #3b3b3b;
  text-align: center;
  margin-left: 200rpx;
  margin-top: 10rpx;
  line-height: 38rpx;
}
.UploadBills {
  width: 184rpx;
  height: 38rpx;
  background: #ffd21f;
  color: #3b3b3b;
  text-align: center;
  margin-top: 10rpx;
  line-height: 38rpx;

  margin-left: 30rpx;
}
.ShareOrder {
  width: 118rpx;
  height: 38rpx;
  background: #ffd21f;
  line-height: 38rpx;
  color: #555555;
  text-align: center;
  margin-top: 10rpx;
  margin-left: 30rpx;
}
.timeimg {
  width: 14rpx;
  height: 14rpx;
  margin-right: 2rpx;
}
.cir {
  width: 12rpx;
  height: 12rpx;
  display: inline-block;
  background: #febd00;
  border-radius: 50%;
  margin-top: rpx;
  margin-right: 2rpx;
}
.IncomeDetails_task {
  margin-top: 26rpx;
  height: 54rpx;
  line-height: 54rpx;
  color: #febd00;
  font-size: 36rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
  font-weight: 700;
  position: relative;
}
.IncomeDetails_task::after {
  content: "";
  width: 6rpx;
  height: 40rpx;
  position: absolute;
  top: 9rpx;
  left: 0;
  background: #febd00;
}
.HistoricalOrder-meta {
  display: flex;
}
.paragraph {
  width: 6rpx;
  height: 40rpx;
  margin-top: 7rpx;
  background: #febd00;
  margin-left: 40rpx;
}
.HistoricalOrder-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.HistoricalOrder-hotel {
  width: 692rpx;
  height: auto;
  margin-top: 60rpx;

  margin-left: 28rpx;
}
.every-HistoricalOrder {
  width: 100%;
  height: auto;
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 4rpx;

  box-shadow: 0px 0px 4rpx 0px rgba(108, 108, 108, 0.4);
  border: 2rpx solid rgba(255, 255, 255, 0);
}
.every-HistoricalOrder-meta {
  font-size: 30rpx;
  display: flex;
  margin-left: 26rpx;
  margin-top: -10rpx;
  justify-content: space-between;
}
.every-HistoricalOrder-meta-text {
  color: #101010;
  font-family: -apple-system;
}
.every-HistoricalOrder-meta-status {
  /* font-size: 24rpx; */
  color: #878787;
  font-family: -apple-system;
  margin-right: 26rpx;
}
.every-HistoricalOrder-time {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
}
.HistoricalOrder-room {
  margin-left: 30rpx;
}
.every-HistoricalOrder-income {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
  display: flex;
  justify-content: left;
  align-items: center;
}
.every-HistoricalOrder-address {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
  display: flex;
  align-items: center;
  justify-content: left;
}
.every-HistoricalOrder-addresses {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;

  align-items: center;
  justify-content: left;
}
.every-HistoricalOrder-button {
  display: flex;
  font-size: 24rpx;
}
.CancellationOfOrder {
  width: 118rpx;
  height: 38rpx;
  background: #ffd21f;
  color: #3b3b3b;
  text-align: center;
  margin-left: 200rpx;
  margin-top: 10rpx;
  line-height: 38rpx;
}
.UploadBills {
  width: 184rpx;
  height: 38rpx;
  background: #ffd21f;
  color: #3b3b3b;
  text-align: center;
  margin-top: 10rpx;
  line-height: 38rpx;

  margin-left: 30rpx;
}
.ShareOrder {
  width: 118rpx;
  height: 38rpx;
  background: #ffd21f;
  line-height: 38rpx;
  color: #555555;
  text-align: center;
  margin-top: 10rpx;
  margin-left: 30rpx;
}
.timeimg {
  width: 14rpx;
  height: 14rpx;
  margin-right: 2rpx;
}
.cir {
  width: 12rpx;
  height: 12rpx;
  display: inline-block;
  background: #febd00;
  border-radius: 50%;
  margin-top: 10rpx;
  margin-right: 2rpx;
}
</style>