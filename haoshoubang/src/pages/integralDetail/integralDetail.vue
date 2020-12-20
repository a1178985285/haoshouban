<template>
  <div>
    <!-- 兑换商品详情 -->
    <div class="Every-IntegralExchange">
      <div class="IntegralExchange-img">
        <img :src="integralDetaildata.imageUrl" />
      </div>
      <div class="IntegralExchange-text">
        <p>{{integralDetaildata.title}}</p>
        <p class="integral">{{integralDetaildata.points}}积分</p>
      </div>
    </div>
    <div class="integral_bottom">
      <p class="integral_title">颜色</p>
      <radio-group class="reginter-choose" @change="radioChangeA">
        <label v-for="item in questionA" :key="item">
          <radio :value="item.value">
            <text>{{ item.name }}</text>
          </radio>
        </label>
      </radio-group>
      <p class="integral_title integral_num">数量</p>
      <input class="integral_number" type="number" v-model="num" :value="num" />
      <p class="integral_title integral_num">收件人</p>
      <input class="integral_man" v-model="recipientName" type="text" placeholder="请输入" />
      <p class="integral_title integral_num">联系电话</p>
      <input class="integral_man" v-model="recipientPhone" type="number" placeholder="请输入" />
      <p class="integral_title integral_num">邮寄地址</p>
      <input class="integral_address" type="text" v-model="recipientAddress" placeholder="请填写邮寄地址" />
      <button class="liuui_button integral_button" @click="ConfirmTheChange">确认兑换</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IntegralID: "",
      num: 1,
      lostmoneny: "",
      integralDetaildata: {},
      questionA: [{ name: "白色", value: 1 }, { name: "紫深色", value: 2 }],
      radioChangeAnswera: null,
      recipientName: "",
      recipientAddress: "",
      recipientPhone: ""
    };
  },
  mounted() {
    console.log(this.$root.$mp.query.type);
    this.IntegralID = this.$root.$mp.query.type;
    this.$http
      .post({
        url: "/point/itemDetail",
        data: {
          id: this.IntegralID
        }
      })
      .then(res => {
        console.log(res.data.item);
        this.integralDetaildata = res.data.item;
      });
  },
  methods: {
    radioChangeA(e) {
      this.radioChangeAnswera = e.target.value;
      console.log(this.radioChangeAnswera);
    },
    showModal(msg) {
      wx.showModal({
        title: "提示", //提示的标题,
        content: msg, //提示的内容,
        showCancel: false, //是否显示取消按钮,
        cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: "#000000", //取消按钮的文字颜色,
        confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: "#3CC51F", //确定按钮的文字颜色,
        success: res => {}
      });
    },
    ConfirmTheChange() {
      //   var params = {
      //     itemId: this.integralDetaildata.id,
      //     memberName: wx.getStorageSync("data").member.memberName,
      //     orderNumber: this.num,
      //     itemPoints: this.integralDetaildata.points,
      //     color: this.radioChangeAnswera,
      //     specification: this.integralDetaildata.specification
      //   };
      //   console.log(params);

      if (
        this.recipientName &&
        this.recipientAddress &&
        /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.recipientPhone)
      ) {
        this.$http
          .post({
            url: "/point/xchange",
            data: {
              memberId: wx.getStorageSync("data").member.id,
              itemId: this.integralDetaildata.id,
              memberName: wx.getStorageSync("data").member.memberName,
              orderNumber: this.num,
              itemPoints: this.integralDetaildata.points,
              color: this.integralDetaildata.color,
              specification: this.integralDetaildata.specification,
              recipientAddress: this.recipientAddress,
              recipientName: this.recipientName,
              recipientPhone:this.recipientPhone
            }
          })
          .then(res => {
            if (res) {
              wx.showModal({
                title: "提示",
                content: "兑换成功",
                showCancel: false
              });
            } else {
              wx.showModal({
                title: "提示",
                content: "积分不足",
                showCancel: false
              });
            }

            console.log(res);
          });
      } else {
        wx.showModal({
          title: "提示",
          content: "请将兑换物品的信息填写完整",
          showCancel: false
        });
      }
    }
  }
};
</script>

<style lang="wxss">
.Every-IntegralExchange {
  width: 308rpx;
  height: 286rpx;
  margin: 54rpx auto;
  opacity: 0.97;
  box-shadow: 0px 4rpx 6rpx 0px rgba(0, 0, 0, 0.4);
  border: 2rpx solid rgba(187, 187, 187, 1);
}
.IntegralExchange-img {
  width: 120rpx;
  height: 166rpx;
  margin-left: 92rpx;
  margin-top: 20rpx;
  background: red;
}
.IntegralExchange-img img {
  width: 100%;
  height: 100%;
}
.IntegralExchange-text {
  margin-left: 16rpx;
  font-size: 23rpx;
  margin-top: 20rpx;
}
.integral {
  color: #f15e3e;
  font-weight: 700;
}
.integral_bottom {
  width: 92%;
  margin: auto;
}
.integral_title {
  font-size: 28rpx;
  color: #101010;
  font-weight: 700;
}
.integral_num {
  margin-top: 32rpx;
}
.reginter-choose {
  margin-top: 20rpx;
  background: white;
  width: 100%;
  padding: 10rpx 0%;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #101010;
}
radio {
  width: 30%;
}
radio .wx-radio-input {
  border-radius: 50%;
  width: 28rpx;
  height: 28rpx;
}

/* 选中后的样式 */
radio .wx-radio-input.wx-radio-input-checked::before {
  border-radius: 50%;
  width: 44rpx;
  height: 44rpx;
  line-height: 44rpx;
  text-align: center;
  font-size: 26rpx; /* 对勾大小 26rpx */
  color: #fff; /* 对勾颜色 */
  background: rgb(0, 157, 217);
  border-color: rgb(0, 157, 217);
}
.integral_number {
  height: 44rpx;
  width: 124rpx;
  font-size: 28rpx;
  border: 2rpx solid #aaa;
  border-radius: 6rpx;
  padding-left: 6rpx;
  margin-top: 16rpx;
}
.integral_man {
  width: 368rpx;
  height: 68rpx;
  padding: 6rpx 10rpx;
  box-sizing: border-box;
  margin-top: 16rpx;
  border: 2rpx solid #aaa;
  border-radius: 6rpx;
}
.integral_address {
  widows: 100%;
  height: 80rpx;
  padding: 6rpx 10rpx;
  box-sizing: border-box;
  border: 2rpx solid #aaa;
  border-radius: 6rpx;
  margin-top: 16rpx;
}
.integral_button {
  background: #f15e3e;
  width: 100%;
  margin-top: 80rpx;
}
</style>
