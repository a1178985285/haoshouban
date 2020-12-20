<!-- 酒店详情 -->
<template>
  <div>
    <div class="hotel_one"></div>
    <div class="hotel">
      <swiper
        previous-margin="-10px"
        next-margin="-10px"
        class="swiper-warp inner"
        indicator-dots
        autoplay
        circular
      >
        <block v-for="(imgurl,index) in imgList" :key="index">
          <swiper-item class="hotel_img">
            <img style="width:100vw;height: 460rpx" mode="scaleToFill" :src="imgurl" />
          </swiper-item>
        </block>
      </swiper>
      <div class="hotel_name inner">
        <div class="hodel_title">
          <p>{{ hodelDetail.hotelName }}</p>
          <!-- <block v-for="item in hodelDetail.star" :key="item">
            <img src="/static/images/index/star.svg" />
          </block>-->
        </div>
        <div class="hodel_right" @click="handelCollect">
          <img :src="noCollect" class="hodel_collect_icon" />
          <p class="hodel_collect">{{ collect }}</p>
        </div>
      </div>
      <div class="newlist inner">
        <div class="hodel_detail">
          <div class="dotel_address">
            <img src="/static/images/file/dizhi.svg" alt />
            <p>地址：{{ hodelDetail.address }}</p>
          </div>
          <div class="fortyperoom" v-for="(item,index) in content.room" :key="index">
            <span class="cir" style="margin-top:8rpx"></span>
            <span>{{item.roomType}}:</span>
            <span>{{item.number}}间 |</span>
            <span>单价￥ {{item.price}}</span>
          </div>
          <div class="dotel_address dotel_time" style="margin-top:0">
            <img src="/static/images/file/shijian.svg" alt />
            <p>时间:{{content.missionStart}}至{{content.missionEnd}}</p>
            <span></span>
          </div>
        </div>
        <div class="order">
          <p class="price">¥ {{content.priceTotal}}</p>
          <button class="fornext" @click="handelOrder">接单</button>
        </div>
      </div>
      <div class="fenge"></div>
      <div class="Hotel_introduction inner">
        <div class="for_meta">
          <p>酒店介绍</p>
        </div>
        <div class="message_text">{{ hodelDetail.content }}</div>
      </div>
      <div class="Hotel_introduction inner">
        <div class="for_meta">
          <p>订单备注</p>
        </div>
        <div class="message_text">{{ orderRemark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noCollect: "/static/images/shoucang/shoucanghui.svg",
      collect: "收藏",
      uid: null,
      hodelDetail: {},
      isforshow: false,
      forid: null,
      forname: null,
      collectid: null,
      favoritetype: null,
      typemore: null,
      roomarry: null,
      missionStart: null,
      missionEnd: null,
      imgList: [],
      content: null,
      orderRemark: ""
    };
  },

  onShow() {
    this.uid = this.$root.$mp.query.id;
    wx.showLoading({
      title: "加载中"
    });
    this.$http
      .post({
        url: "/home/hotelDetail",
        data: {
          id: this.uid,
          memberId: wx.getStorageSync("data")
            ? wx.getStorageSync("data").member.id
            : ""
        }
      })
      .then(res => {
        wx.setStorageSync("favotype", res.data.favorited);
        this.favoritetype = res.data.favorited;
        this.content = JSON.parse(res.data.hotel.missionContent);
        wx.hideLoading();
        this.hodelDetail = res.data.hotel;
        this.imgList = res.data.imageUrl;
        this.orderRemark = res.data.orderRemark;
        console.log(this.imgList);
        this.forid = res.data.hotel.id;
        this.forname = res.data.hotel.hotelName;

        if (res.data.favorited) {
          console.log("进入了吗");
          this.noCollect = "/static/images/person/shoucang.svg";
          this.isforshow = true;
          this.collect = "已收藏";
        } else {
          this.noCollect = "/static/images/shoucang/shoucanghui.svg";
          this.isforshow = false;
          this.collect = "收藏";
        }
      });
  },
  methods: {
    //点击收藏/取消收藏

    handelCollect() {
      const USER_DATA = wx.getStorageSync("data");
      this.memberName = USER_DATA ? USER_DATA.member.memberName : "";

      if (this.memberName == "" || !this.memberName) {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "您还未登陆或注册", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
        return;
      }

      if (this.isforshow == false) {
        console.log(this.forid);

        var params = {
          hotelId: this.forid,
          memberId: wx.getStorageSync("data").member.id,
          favoriteType: 0,
          hotelName: this.forname
        };
        console.log(params);
        this.$http
          .post({
            url: "/user/favorite",
            data: {
              hotelId: this.forid,
              memberId: wx.getStorageSync("data").member.id,
              favoriteType: 0,
              hotelName: this.forname
            }
          })
          .then(res => {
            console.log(res);
            this.collectid = res.data.favorite.id;
            wx.setStorageSync("collectid", this.collectid);
            this.noCollect = "/static/images/person/shoucang.svg";
            this.collect = "已收藏";
            wx.showToast({
              title: "收藏成功",
              icon: "success",
              duration: 1000
            });
          });

        this.isforshow = true;
      } else {
        console.log(this.uid);
        console.log(wx.getStorageSync("data").member.id * 1);
        this.collect = "收藏";

        var data = {
          memberId: wx.getStorageSync("data").member.id,
          id: this.collectid
        };
        console.log("新的");
        console.log(data);

        this.$fly
          .post(this.$base_url + "/user/removeFavorite", {
            memberId: wx.getStorageSync("data").member.id,
            id: wx.getStorageSync("collectid")
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });

        this.isforshow = false;
        this.noCollect = "/static/images/shoucang/shoucanghui.svg";
        console.log(this.noCollect);
        wx.showToast({
          title: "取消收藏",
          icon: "success",
          duration: 1000
        });
      }

      // this.hodelDetail.isCollect = !this.hodelDetail.isCollect;
      // if(this.hodelDetail.isCollect){

      // } else {
      //     this.noCollect = "/static/images/index/star2.svg";
      //     this.collect = "收藏";
      //     wx.showToast({
      //         title: '取消收藏成功',
      //         icon: 'success',
      //         duration: 1000,
      //     })
      // }
    },
    handelOrder() {
      const USER_DATA = wx.getStorageSync("data");
      this.memberName = USER_DATA ? USER_DATA.member.memberName : "";

      if (this.memberName == "" || !this.memberName) {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "您还未登陆或注册", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              // wx.switchTab({ url: "/pages/index/main" });
            }
          }
        });
        return;
      }
      if (USER_DATA.member.sign == 1) {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "请等待审核成功后，进行接单", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
      }

      if (USER_DATA.member.sign == 2) {
        wx.navigateTo({
          url: "../Receipt/main?id=" + this.uid
        });
      } else if (USER_DATA.member.sign == 0) {
        wx.navigateTo({
          url: "../Signing/main?id=" + USER_DATA.member.id
        });
      }
    }
  }
};
</script>

<style lang="wxss">
page {
  background: #414143;
}
.newlist {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hotel_one {
  width: 100%;
  height: 300rpx;
  background: #fff;
}
.hotel {
  /* width: 684rpx; */
  margin: -272rpx auto;
}
.swiper-warp{
  /* width: 684rpx; */
  height: 400rpx;
  box-sizing: border-box;
 border: 6rpx solid #fff;
}
.hotel_img {
  width: 750rpx;
  height: 500rpx;
  border: 6rpx solid #fff;
}
.hotel_img img {
  width: 100%;
  height: 100%;
}
.hotel_name {
  width: 690rpx;
  height: 80rpx;
  border-bottom: 2rpx solid #fff;
  color: #fff;
  margin: 20rpx auto 10rpx !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hodel_title {
  font-size: 31rpx;
  margin-right: 6rpx;
  display: flex;
  align-items: center;
}
.Hotel_introduction {
  width: 690rrpx;
  height: 180rpx;

  border-bottom: 1px solid #fff;
}
.Hotel_introduction:last-child{
  border: none;
}
.fornext {
  width: 114rpx;
  height: 40rpx;
  line-height: 40rpx;
  background: #febd00;
  font-size: 25rpx;
  border-radius: 6rpx;
}
.hodel_title p {
  margin-right: 8rpx;
}
.hodel_title img {
  width: 30rpx;
  height: 30rpx;
}
.hodel_collect {
  font-size: 16rpx;
  color: #fff;
  margin-top: -10rpx;
}
.for_meta {
  width: 100%;
  height: 56rpx;
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}
.for_meta p {
  color: #febd00;
  font-size: 26rpx;
  font-weight: bold;
}

.hodel_collect_icon {
  width: 30rpx;
  height: 30rpx;
}
.hodel_detail {
  width: 80%;
  font-size: 25rpx;
  color: #fff;
  padding-bottom: 30rpx;
  box-sizing: border-box;
  /* border-bottom: 12rpx solid #fff; */
  text-align: justify;
}
.order {
  width: 26%;
  margin-top: -50rpx;
  margin-left: 60rpx;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end; */
  /* border-bottom: 12rpx solid #fff; */
}
.message_text {
  font-size: 24rpx;
  color: #ffffff;
  padding-bottom: 30rpx;
}
.dotel_address {
  margin-top: 20rpx;
  display: flex;
  align-items: flex-start;
  color: #fff;
  font-size: 24rpx;
}
.dotel_address img {
  width: 49rpx;
  height: 24rpx;
  margin-right: 6rpx;
  margin-top: 8rpx;
}
.dotel_time img {
  width: 20rpx;
  height: 20rpx;
}
.hodel_right {
  text-align: center;
}

.cir {
  width: 12rpx;
  height: 12rpx;
  display: inline-block;
  background: #febd00;
  border-radius: 50%;
  /* margin-top: rpx; */
  margin: 0 7rpx 0 4rpx;
  transform: translateY(-5rpx);
}
.price {
  color: #febd00;
  text-align: center;
  font-weight: bold;
  margin-bottom: 16rpx;
}
.inner {
  width: 690rpx;
  margin: 0 auto;
}
.fenge {
  width: 750rpx;
  height: 12rpx;
  background: white;
}
.fortyperoom span{
  display: inline-block;
}
</style>



