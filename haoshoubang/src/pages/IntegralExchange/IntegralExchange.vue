<template>
  <div class="IntegralExchange-container">
    <div class="IntegralExchange-tab">
      <div class="tab-item">
        <img src="/static/images/icon/remaining.png" alt />
        <span>剩余积分：</span>
        <span class="core">{{core}}</span>
      </div>
      <div class="tab-item" @click="gotoList">
        <img src="/static/images/icon/gift.png" alt />
        <span>兑换记录></span>
      </div>
    </div>
    <div class="list-warp">
      <div
        class="Every-IntegralExchange"
        v-for="(item,index) in IntegralGoods"
        :key="index"
        @click="funclick(item.id,item.giftType)"
      >
        <div class="TelephoneExchange-img">
          <img mode="heightFix" :src="item.imageUrl" />
        </div>
        <div class="IntegralExchange-text">
          <p>{{item.title}}</p>
          <p class="integral">{{item.points}}积分</p>
        </div>
      </div>
    </div>
    <!-- <div class="intergra_message">
      <p>
        说明：
        帮客兑换后积分自动减少，帮客积分不够的情况下选择兑换时提醒帮客积分不够。
      </p>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      IntegralGoods: [],
      core: 0
    };
  },

  onShow() {
    const USER_DATA = wx.getStorageSync("data").member;
    this.core = USER_DATA.pointBalance;
    this.getUserInfo()
    this.$http
      .post({
        url: "/point/itemList",
        data: {
          page: 1,
          limit: 10
        }
      })
      .then(res => {
        this.IntegralGoods = res.data.record;
        console.log(this.IntegralGoods);
      });
  },
  methods: {
    gotoList() {
      wx.navigateTo({ url: "/pages/xchangeRecord/main" });
    },
    getUserInfo() {
      const tel = wx.getStorageSync("del");
      let that = this;
      //获取登录信息
      if (tel) {
        wx.login({
          success(res) {
            that.$http
              .post({
                url: "/wechat/getOpenid",
                data: {
                  code: res.code,
                  mobile: tel
                }
              })
              .then(res => {
                wx.setStorageSync("data", res.data);
                if (res.data.member.memberName) {
                  const CHECKIN = wx.getStorageSync("CHECKIN");
                  if (CHECKIN) {
                    let newData = that.formatTime(new Date());
                    let oldDate = that.formatTime(CHECKIN);
                    console.log(newData, oldDate);
                    if (nowM != oldM) {
                      that.sign = true;
                    } else {
                      that.sign = false;
                    }
                  } else {
                    that.sign = true;
                    wx.setStorageSync("CHECKIN", new Date());
                  }
                }
              });
          }
        });
      }
    },
    handleDetail() {},
    funclick(datafor, giftType) {
      console.log(giftType);
      if (giftType == 0) {
        wx.navigateTo({
          url: "../ChangeThePhone/main?type=" + datafor
        });
      } else {
        wx.navigateTo({
          url: "../integralDetail/main?type=" + datafor
        });
      }
    }
  }
};
</script>

<style>
.IntegralExchange-container {
  width: 100%;
  min-height: 100vh;
  background: #e5e5e5;
}
.IntegralExchange-tab {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  margin-bottom: 20rpx;
}
.tab-item {
  width: 50%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.tab-item span {
  font-size: 28rpx;
  color: #101010;
}
.tab-item .core {
  color: rgba(254, 189, 0, 1);
  font-size: 44rpx;
  text-align: left;
}
.tab-item .more {
  font-size: 30rpx;
  font-weight: bold;
}
.tab-item:first-child {
  border-right: 1px solid #e5e5e5;
}
.tab-item:last-child {
  border-left: 1px solid #e5e5e5;
}
.tab-item img {
  width: 56rpx;
  height: 56rpx;
  margin-right: 8rpx;
}
.list-warp {
  padding: 54rpx 50rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
}
.Every-IntegralExchange {
  width: 48%;
  /* height: 300rpx; */
  padding: 20rpx 20rpx 10rpx;
  box-sizing: border-box;
  opacity: 0.97;
  box-shadow: 0px 4rpx 6rpx 0px rgba(0, 0, 0, 0.4);
  border: 2rpx solid rgba(187, 187, 187, 1);
  margin-bottom: 44rpx;
}
.IntegralExchange-img {
  width: 120rpx;
  height: 166rpx;
  margin: auto;
  background: red;
}
.IntegralExchange-img img {
  width: 100%;
  height: 100%;
}
.IntegralExchange-text {
  width: 100%;
  font-size: 23rpx;
  margin-top: 10rpx;
}
.integral {
  color: #f15e3e;
  font-weight: 700;
}
.TelephoneExchange-img {
  /* width: 270rpx; */
  height: 166rpx;
  margin: auto;
  display: flex;
  justify-content: center;
}
.TelephoneExchange-img img {
  width: 100%;
  height: 100%;
}
.Explain {
  width: 654rpx;
  height: 156rpx;
  color: #ff1818;
  font-family: PingFangSC-regular;
  margin-top: 144rpx;
  font-size: 28rpx;
}
.intergra_message {
  color: #ff1818;
  font-size: 28rpx;
  position: absolute;
  bottom: 0;
}
</style>
