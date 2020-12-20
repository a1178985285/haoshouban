<template>
  <div>
    <div class="hotel_list" v-for="(hotelItem,hotelIndex) in hotelList" :key="hotelIndex">
      <div class="hotel_img" @click="testsss" :data-id="hotelItem.id">
        <img :src="hotelItem.imageUrl1" mode />
      </div>
      <div class="hotel_message" @click="testsss(hotelItem)">
        <p class="hotel_name" style="font-weight:600;font-size: 30rpx">{{ hotelItem.hotelName }}</p>
        <p class="hotel_name hotel_address" style=" font-size: 24rpx;">{{ hotelItem.address }}</p>
        <p
          class="hotel_name hotel_address"
          style=" font-size: 24rpx;"
          v-for="(roomItem,roomIndex) in hotelItem.missionContent.room"
          :key="roomIndex"
        >{{ roomItem.roomType }}: {{ roomItem.number }}间 | 单价 ￥{{ roomItem.price }}</p>
        <p
          class="hotel_address"
          style=" font-size: 24rpx;width: 130%;"
        >{{ hotelItem.missionContent.missionStart }}至{{ hotelItem.missionContent.missionEnd }}</p>
        <!-- <p style=" font-size: 22rpx;"
          class="hotel_address"
        >清洁需求{{ hotelItem.roomNum ? hotelItem.roomNum : 0 }}间 | 每间￥{{ hotelItem.roomPrice ? hotelItem.roomPrice : 0 }}</p>-->
      </div>
      <div class="hotel_button">
        <!-- <div class="hotel_eval">
          <block v-for="item in hotelItem.star" :key="item">
            <img src="/static/images/index/star.svg" />
          </block>
          <block v-for="item in hotelItem.star2" :key="item">
            <img src="/static/images/index/star2.svg" />
          </block>
        </div>-->
        <p class="hotel_price">￥{{hotelItem.missionContent.priceTotal}}</p>
        <p class="hotel_order" @click="handleOrder" :data-id="hotelItem.id">接单</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initList: Array
  },
  data() {
    return {
      hotelList: this.initList,
      rommlist: null,
      forlist: [],
      memberName: ""
    };
  },
  beforeMount() {
    console.log(this.hotelList, "--------");
  },
  methods: {
    //进入酒店详情
    testsss(hotelItem) {
      this.$emit("handleHotelDetail", hotelItem);
    },
    //点击接单
    handleOrder(e) {
      const USER_DATA = wx.getStorageSync("data");
      // this.memberName = USER_DATA.member.memberName;

      if (!USER_DATA || JSON.stringify(USER_DATA) == "{}") {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "您还未注册或者登陆", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              wx.switchTab({ url: "/pages/person/main" });
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
        return;
      }
      let id = e.currentTarget.dataset.id;
      this.$emit("handleOrders", id);
    }
  }
};
</script>

<style>
.hotel_list {
  width: 100%;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-bottom: 2rpx solid #eee;
  display: flex;
  /* align-items: flex-end; */
  justify-content: space-between;
}
.hotel_name {
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.hotel_img {
  /* width: 195rpx;
  height: 130rpx; */
  width: 146rpx;
  height: 100rpx;
  background: #aaa;
}
.hotel_img img {
  width: 100%;
  height: 100%;
}
.hotel_message {
  width: 55%;
  /* height: 130rpx; */
  padding-left: 10rpx;
  box-sizing: border-box;
}
.hotel_address {
  font-size: 22rpx;
  color: #aaa;
}
.hotel_button {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.hotel_eval {
  width: 100%;
  height: 80rpx;
  display: flex;
  /* line-height: 70rpx; */
  align-items: center;
  justify-content: center;
}
.hotel_eval img {
  width: 30rpx;
  height: 30rpx;
}
.hotel_price {
  color: #febd00;
  font-size: 32rpx;
  text-align: right;
  font-weight: 700;
}
.hotel_order {
  background: #febd00;
  width: 100rpx;
  font-size: 24rpx;
  text-align: center;
  height: 40rpx;
  line-height: 40rpx;
  color: #262626;
  /* margin: 25rpx auto 0; */
  float: right;
  border-radius: 6rpx;
}
</style>
