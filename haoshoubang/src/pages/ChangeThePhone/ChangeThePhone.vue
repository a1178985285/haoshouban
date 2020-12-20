<template>
  <div>
    <!-- 兑换商品详情 -->
    <div class="Every-IntegralExchange">
      <div class="IntegralExchange-img">
        <img mode="heightFix" :src="integralDetaildata.imageUrl" />
      </div>
      <div class="IntegralExchange-text">
        <p>{{integralDetaildata.title}}</p>
        <p class="integral">{{integralDetaildata.points}}积分</p>
      </div>
    </div>
    <div class="integral_bottom">
      <p class="integral_title">运营商</p>
      <radio-group class="reginter-choose" @change="radioChangeA">
        <label v-for="item in questionA" :key="item">
          <radio :value="item.name">
            <text>{{ item.name }}</text>
          </radio>
        </label>
      </radio-group>
      <p class="integral_title integral_num">数量</p>
      <input class="integral_number" type="number" v-model="num" :value="num" />
      <p class="integral_title integral_num">手机号码</p>
      <input class="integral_man" type="text" v-model="recipientPhone" placeholder="请输入" />

      <button class="liuui_button integral_button" @click="ConfirmTheChange">确认兑换</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IntegralID: "",
      recipientPhone: "",
      num: 1,
      lostmoneny: "",
      recipientName: "商品兑换",
      integralDetaildata: {},
      questionA: [
        { name: "中国移动", value: 1 },
        { name: "中国联通", value: 2 },
        { name: "中国电信", value: 3 }
      ],
      radioChangeAnswera: null
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
    ConfirmTheChange() {
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.recipientPhone) && this.radioChangeAnswera) {
        this.$http
          .post({
            url: "/point/xchange",
            data: {
              memberId: wx.getStorageSync("data").member.id,
              itemId: this.integralDetaildata.id,
              memberName: wx.getStorageSync("data").member.memberName,
              orderNumber: this.num,
              itemPoints: this.integralDetaildata.points,
              specification: this.integralDetaildata.specification,
              recipientName: "商品兑换",
              carrierOperator: this.radioChangeAnswera,
              recipientPhone: this.recipientPhone
            }
          })
          .then(res => {
            if (res) {
              wx.showModal({
                title: "提示",
                content: "兑换成功",
                showCancel: false
              });
              this.radioChangeAnswera = null
              this.recipientPhone = ''
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
  /* width: 120rpx;
  height: 166rpx;
  margin-left: 92rpx;
  margin-top: 20rpx;
  background: red; */
  height: 166rpx;
}
.IntegralExchange-img img {
  margin: 20rpx auto 0;
  display: block;

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
