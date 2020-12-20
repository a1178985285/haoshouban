<template>
  <!-- 好手帮提现-->
  <div>
    <div class="deposit_top liuui_width">
      <span class="account">到账账户</span>
      <span>工商银行储蓄卡（1234）</span>
    </div>
    <div class="deposit_money">
      <p class="deposit_money_item">转出金额</p>
      <div class="deposit_input">
        <span>￥</span>
        <input type="digit" v-model="moneyfor" :value="moneyfor" />
      </div>
      <p class="deposit_balance">可用余额¥{{balance}}</p>
      <button class="liuui_button deposit_button" @click="fun">提现</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isforshow: false,
      forlist: "",
      moneyfor: null,
      balance: 0
    };
  },
  onShow() {
    const USER_DATA = wx.getStorageSync("data").member;
    this.balance = USER_DATA.accountBalance;
  },
  methods: {
    //点击提现发起请求
    fun() {
      console.log(this.moneyfor);
      if (this.moneyfor > this.balance) {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "提现金额大于余额", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
        return;
      }
      this.$http
        .post({
          url: "/account/withdraw",
          data: {
            memberId: wx.getStorageSync("data").member.id,
            memberName: wx.getStorageSync("data").member.memberName,
            withdrawAmount: this.moneyfor
          }
        })
        .then(res => {
          //如果成功提示 提现成功
          if (res) {
            wx.showModal({
              title: "提示",
              content: "提现成功",
              showCancel: false,
              success(res) {}
            });
          }

          console.log(res.data.withdraw.applyNo);
          this.forlist = res.data.withdraw.applyNo;
        });
    }
  }
};
</script>

<style lang="wxss">
.deposit_top {
  /* text-align: center; */
  font-size: 22rpx;
  color: #878787;
  height: 56rpx;
  line-height: 56rpx;
  margin-top: 30rpx;
  border-left: 6rpx solid #febd00;
}
.account {
  color: #febd00;
  font-size: 36rpx;
  margin: 0 76rpx 0 20rpx;
}
.deposit_money {
  width: 100%;
  padding: 150rpx 92rpx 0;
  box-sizing: border-box;
}
.deposit_money_item {
  font-size: 24rpx;
  color: #878787;
}
.deposit_input {
  width: 100%;
  height: 126rpx;
  padding: 18rpx 0;
  box-sizing: border-box;
  border-bottom: 6rpx solid #eee;
  display: flex;
  align-items: center;
}
.deposit_input span {
  color: #101010;
  font-size: 66rpx;
  font-weight: 700;
}
.deposit_input input {
  height: 80rpx;
  font-size: 60rpx;
}
.deposit_balance {
  height: 56rpx;
  line-height: 56rpx;
  font-size: 24rpx;
  color: #878787;
  margin-top: 14rpx;
}
.deposit_button {
  width: 100%;
  margin-top: 40rpx;
}
</style>
