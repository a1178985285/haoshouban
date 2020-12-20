<template>
  <div>
    <swiper
      class="liuui_width"
      indicator-dots="true"
      autoplay="true"
      interval="4000"
      duration="500"
    >
      <block v-for="(item, index) in SwiperMessage" :key="index">
        <swiper-item @click="handRouter(item)">
          <view class>
            <img style="width:100vw;height: 460rpx" mode="scaleToFill" :src="item.imageUrl" />
          </view>
        </swiper-item>
      </block>
    </swiper>
    dsds
    <div class="hotel_task liuui_width">酒店任务</div>
    <div class="liuui_width screen" style="font-size: 27rpx;">
      <picker
        class="picker"
        :range="industryList"
        :value="index"
        :name="name"
        range-key="name"
        @change="handIndustryId"
      >
        <view>{{!provinces?'选择省:':''}}{{provinces}}</view>
      </picker>
      <picker
        class="picker"
        :range="cityList"
        :value="index"
        :name="name"
        range-key="name"
        @change="handCity"
      >
        <view>{{!city?'选择市:':''}}{{city}}</view>
      </picker>
      <picker
        class="picker"
        :range="areaList"
        :value="index"
        :name="name"
        range-key="name"
        @change="handArea"
      >
        <view>{{!area?'选择区/县:':''}}{{area}}</view>
      </picker>
      <p style="color: #eee;">|</p>
      <span style="margin-left: 18rpx;" @click="queryList">筛选</span>
    </div>
    <div class="liuui_width">
      <IndexCard
        :init-list="hotelList"
        v-if="hotelList.length > 0"
        @handleHotelDetail="handleHotelDetailId"
        @handleOrders="handleOrderDetail"
      />
    </div>
    <div class="index_sign" v-if="sign">
      <div class="index_sign_item">
        <div class="index_sign_icon">
          <img src="/static/images/index/tick.svg" mode="widthFix" />
        </div>
        <p class="index_sign_title">今日签到成功</p>
        <div class="index_sign_money">
          <img src="/static/images/index/jifen.svg" alt />
        </div>
        <div class="index_sign_integral">
          积分
          <p>+1</p>
        </div>
        <div class="index_sign_button" @click="closeSign">我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import Prick from "@/components/prick.vue";
import IndexCard from "@/components/indexCard.vue";
export default {
  components: { Prick, IndexCard },
  data() {
    return {
      ex: "",
      forlist: "",
      online: 4,
      newlist: [],
      areaplace: null,
      total: null,
      SwiperMessage: [],
      background: [{ text: "demo1" }, { text: "demo2" }],
      industryList: [],
      politicalFace: "",
      hotelList: [],
      sign: false,
      pages: 1,
      provinces: "",
      cityList: [],
      city: "",
      selectId: "",
      areaList: [],
      area: "",
      industryId: "",
      cityId: "",
      areaId: ""
    };
  },
  beforeMount() {},
  onShow() {
    const tel = wx.getStorageSync("del");
    let that = this;
    this.pages = 1
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

    wx.login({
      success: res => {
        that.$http
          .post({
            url: "/wechat/getSessionKey",
            data: {
              code: res.code
            }
          })
          .then(res => {
            console.log(res);
            wx.setStorageSync("session_key", res.data.json.session_key);
            wx.setStorageSync("openid", res.data.json.openid);
          });
      },
      fail: () => {},
      complete: () => {}
    });

    this.getHomeList(this.selectId);
    //获取首页信息
    this.$http
      .post({
        url: "/district/tree"
      })
      .then(res => {
        this.industryList = res.data.tree;
        this.industryList.unshift({
          id: -1,
          name: "全部",
          children: []
        });
      });

    this.$http
      .post({
        url: "/home/flowimg",
        data: {
          page: 0,
          limit: 20
        }
      })
      .then(res => {
        console.log("新的轮播图");
        console.log(res);
        this.SwiperMessage = res.data.record;
      });
  },
  onReachBottom: function() {
    let _this = this;
    this.pages++;
    if (this.online > this.total) {
    } else {
      this.$http
        .post({
          url: "/order/orderPending",
          data: {
            page: this.pages,
            limit: this.online,
            area: ""
          }
        })
        .then(res => {
          for (var i = 0; i < res.data.record.length; i++) {
            res.data.record[i].missionContent = JSON.parse(
              res.data.record[i].missionContent
            );
            _this.hotelList.push(res.data.record[i]);
          }
        });
    }
  },
  methods: {
    queryList() {
      this.getHomeList(this.selectId);
    },
    formatTime(date) {
      const nowM = date.getMonth() + 1;
      const nowDay = date.getDate();
      return `${nowM}${nowDay}`;
    },
    handRouter(item) {
      wx.navigateTo({ url: item.linkUrl });
    },
    handArea(e) {
      const INDEX = e.mp.detail.value;
      this.area = this.areaList[INDEX]["name"];
      this.areaId = this.areaList[INDEX]["id"];
      console.log(this.areaList[INDEX], this.selectId);
    },
    handCity(e) {
      const INDEX = e.mp.detail.value;
      this.city = this.cityList[INDEX]["name"];
      this.areaList = this.cityList[INDEX]["children"] || [];
      this.cityId = this.cityList[INDEX]["id"];
      this.areaId = "";
    },
    // 获取列表 排序
    getHomeList(id) {
      let area;
      if (this.industryId == "" || this.industryId == "-1") {
        area = "";
      }
      if (this.industryId != "" && this.cityId == "" && this.areaId == "") {
        area = `${this.industryId},`;
      }
      if (this.industryId != "" && this.cityId != "" && this.areaId == "") {
        area = `${this.industryId},${this.cityId}`;
      }

      if (this.industryId != "" && this.cityId != "" && this.areaId != "") {
        area = `${this.industryId},${this.cityId},${this.areaId}`;
      }
      wx.showLoading({
        title: "加载中", //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      this.$http
        .post({
          url: "/order/orderPending",
          data: {
            page: this.pages,
            limit: this.online,
            area: area
          }
        })
        .then(res => {
          wx.hideLoading();
          this.hotelList = [];
          this.total = res.data.total;
          this.hotelList = res.data.record;
          for (let i = 0; i < this.hotelList.length; i++) {
            this.hotelList[i].missionContent = JSON.parse(
              this.hotelList[i].missionContent
            );
          }
          console.log(this.hotelList, "----------------------");
        });
    },
    //获取选择框的id
    handIndustryId(e) {
      const INDEX = e.mp.detail.value;
      console.log(INDEX);
      if (INDEX == 0) {
        this.cityList = [];
        this.industryId = "";
        this.provinces = this.industryList[INDEX]["name"];
        return;
      }
      this.provinces = this.industryList[INDEX]["name"];
      this.cityList = this.industryList[INDEX]["children"];
      this.industryId = this.industryList[INDEX]["id"];
      this.city = "";
      this.cityId = "";
    },
    //点击进入酒店详情
    handleHotelDetailId(data) {
      console.log(data);
      wx.navigateTo({
        url: `../hotelDetail/main?id=${data.id}`
      });
    },
    //点击接单
    handleOrderDetail(data) {
      const USER_DATA = wx.getStorageSync("data").member;
      if (USER_DATA.sign == 2) {
        wx.navigateTo({
          url: "../Receipt/main?id=" + data
        });
      } else if (USER_DATA.sign == 0) {
        wx.navigateTo({
          url: "../Signing/main?id=" + data
        });
      }
    },
    //签到
    closeSign() {
      this.$http
        .post({
          url: "/user/signin",
          data: {
            memberName: wx.getStorageSync("data").member.memberName,

            memberId: wx.getStorageSync("data").member.id
          }
        })
        .then(res => {
          console.log(res.msg);
          this.forlist = res.msg;
          this.sign = false;
        });
    }
  }
};
</script>

<style scoped>
swiper {
  background: #aaa;
  height: 460rpx;
  margin-top: 30rpx;
}
.hotel_task {
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
.hotel_task::after {
  content: "";
  width: 6rpx;
  height: 40rpx;
  position: absolute;
  top: 9rpx;
  left: 0;
  background: #febd00;
}
.screen {
  /* margin-left: 80%; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #666;
  font-size: 24rpx;
  height: 60rpx;
}
.hotel_name {
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.hotel_list {
  width: 100%;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-bottom: 2rpx solid #aaa;
  display: flex;
}

.hotel_img {
  width: 25%;
  height: 130rpx;
  background: #aaa;
}
.hotel_img img {
  width: 100%;
  height: 100%;
}
.hotel_message {
  width: 55%;
  height: 130rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.hotel_address {
  font-size: 24rpx;
  color: #aaa;
}
.hotel_button {
  width: 20%;
}
.hotel_eval {
  width: 100%;
  height: 65rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hotel_eval img {
  width: 30rpx;
  height: 30rpx;
}
.hotel_order {
  background: #febd00;
  width: 100rpx;
  font-size: 24rpx;
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  color: #fff;
  margin: 25rpx auto 0;
}
.index_sign {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}
.index_sign_item {
  width: 564rpx;
  height: 604rpx;
  margin: 35% auto;
  background: #fff;
  border-radius: 20rpx;
  text-align: center;
  font-size: 32rpx;
}
.index_sign_icon {
  width: 146rpx;
  height: 146rpx;
  border-radius: 50%;
  background: #febd00;
  border: 16rpx solid #fff;
  margin-top: -81rpx;
  display: inline-block;
}
.picker {
  width: auto;
}

.index_sign_icon img {
  width: 90rpx;
  margin-top: 46rpx;
}
.index_sign_title {
  font-weight: 600;
  margin-top: 28rpx;
}
.index_sign_money {
  width: 116rpx;
  height: 116rpx;
  /* background: #F15E3E; */
  border-radius: 50%;
  margin: 46rpx auto 0;
}
.index_sign_money img {
  width: 100%;
  height: 100%;
}
.index_sign_integral {
  margin: 10rpx auto;
  height: 74rpx;
  /* line-height: 54rpx; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.index_sign_integral p {
  font-size: 60rpx;
  color: #f15e3e;
  font-weight: 700;
  margin-top: -8rpx;
}
.index_sign_button {
  width: 444rpx;
  height: 90rpx;
  border-radius: 90rpx;
  background: #febd00;
  text-align: center;
  line-height: 90rpx;
  color: #fff;
  margin: 42rpx auto;
}
</style>
