<template>
  <div class="MyCollection-container">
    <div class="IncomeDetails_task liuui_width">我的收藏列表</div>
    <div class="MyCollection-hotel">
      <div class="every-hotel" v-for="(item,index) in CollectTheData" :key="index">
        <div class="hotel-message" style="margin-left:0">
          <div class="hotel-meta">
            <p class="hotel-text">{{item.hotel.hotelName}}</p>
            <div class="collection">
              <img :src="forimg" alt @click="explacefor(item.favorite.id)" />
              收藏
            </div>
          </div>
          <p class="address">{{item.address}}</p>
          <div class="every-HistoricalOrder-addresses">
            <div>
              <div
                v-for="(items,indexs) in item.hotel.missionContent.room"
                :key="indexs"
                style="display:flex;margin-left:0)"
              >
                <span class="cir" style="margin-top:12rpx"></span>

                <p
                  style="font-size:26rpx;"
                >{{items.roomType}}{{items.number}}间&nbsp;|&nbsp; 单价/￥{{items.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$http
      .post({
        url: "/user/myFavorite",
        data: {
          memberId: wx.getStorageSync("data").member.id
        }
      })
      .then(res => {
        this.CollectTheData = res.data.records;
        for (let i = 0; i < this.CollectTheData.length; i++) {
          this.CollectTheData[i].hotel.missionContent = JSON.parse(
            this.CollectTheData[i].hotel.missionContent
          );
        }
      });
  },

  data() {
    return {
      CollectTheData: [],
      forimg: "/static/images/person/shoucang.svg",
      CollectTheList: [],

      datas: [
        {
          img: "/static/images/test.jpg",
          name: "北京亚奥国际酒店",
          address: "朝阳区北沙滩大屯路甲一号",
          count: 20,
          priece: 20
        },
        {
          img: "/static/images/test.jpg",
          name: "北京亚奥国际酒店",
          address: "朝阳区北沙滩大屯路甲一号",
          count: 20,
          priece: 20
        },
        {
          img: "/static/images/test.jpg",
          name: "北京亚奥国际酒店",
          address: "朝阳区北沙滩大屯路甲一号",
          count: 20,
          priece: 20
        },
        {
          img: "/static/images/test.jpg",
          name: "北京亚奥国际酒店",
          address: "朝阳区北沙滩大屯路甲一号",
          count: 20,
          priece: 20
        },
        {
          img: "/static/images/test.jpg",
          name: "北京亚奥国际酒店",
          address: "朝阳区北沙滩大屯路甲一号",
          count: 20,
          priece: 20
        }
      ]
    };
  },
  methods: {
    explacefor(ids) {
      this.$http
        .post({
          url: "/user/removeFavorite",
          data: {
            id: ids,
            memberId: wx.getStorageSync("data").member.id
          }
        })
        .then(res => {
          console.log(res);
        });
    }
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
.MyCollection-meta {
  display: flex;
  margin-top: 28rpx;
}
.paragraph {
  width: 6rpx;
  height: 40rpx;
  margin-top: 7rpx;
  background: #febd00;
  margin-left: 40rpx;
}
.MyCollection-meta-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.MyCollection-hotel {
  width: 100%;
  padding: 32rpx;
  box-sizing: border-box;
}
.every-hotel {
  width: 100%;
  display: flex;
  border-bottom: 2rpx solid #eee;
  padding: 30rpx 0;
  box-sizing: border-box;
}
.hotel-img {
  width: 195rpx;
  height: 130rpx;
  height: auto;
}
.hotel-img img {
  width: 100%;
  height: 100%;
}
.hotel-message {
  width: 544rpx;
  height: auto;
  margin-left: 10rpx;
}
.hotel-meta {
  display: flex;
  justify-content: space-between;
  margin-left: 20rpx;
}
.hotel-text {
  font-size: 34rpx;
  color: #101010;
  font-family: -apple-system;
}
.collection {
  font-size: 24rpx;
  color: #878787;
  font-family: -apple-system;
  text-align: center;
  display: flex;
  align-items: center;
}
.collection img {
  width: 26rpx;
  height: 26rpx;
  margin-right: 8rpx;
}
.address {
  color: #878787;
  font-size: 26rpx;
  font-family: -apple-system;
  margin-left: 20rpx;
}
.CleaningRequirements {
  color: #878787;
  font-size: 26rpx;
  font-family: -apple-system;
  margin-left: 20rpx;
}
.rictyle {
  margin-top: 30rpx;
  width: 730rpx;
  height: 20rpx;
}
.rictyle .cir {
  width: 730rpx;
  height: 2rpx;
  background: #dedede;
  margin-top: 15rpx;
}
.every-HistoricalOrder-income {
  font-size: 26rpx;
  color: #878787;
  margin-left: 26rpx;
  display: flex;
  justify-content: left;
  align-items: center;
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
  background: #b9b1b1;
  color: #3b3b3b;
  text-align: center;
  margin-left: 200rpx;
  margin-top: 10rpx;
  line-height: 38rpx;
}
.UploadBills {
  width: 184rpx;
  height: 38rpx;
  background: #b9b1b1;
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
  margin-left: 20rpx;
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