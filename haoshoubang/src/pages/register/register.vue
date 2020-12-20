<!-- 手机号注册 -->
<template>
  <div class="reginter">
    <div v-if="reginter">
      <div class="reginter_title">
        <span class="reginter_choose">1.输入手机号</span> >
        <span>2.输入验证码</span> >
        <span>3.设置密码</span>
      </div>
      <input
        type="number"
        class="liuui_input reginter_input"
        placeholder="请输入您的手机号"
        maxlength="11"
        v-model="tel"
      />
      <button class="liuui_button reginter_code" @click="handleCode">获取验证码</button>
    </div>
    <div v-if="!reginter">
      <div class="reginter_title">
        <span>1.输入手机号</span> >
        <span class="reginter_choose">2.输入验证码</span> >
        <span>3.设置密码</span>
      </div>
      <p class="liu_width reginter_note">验证码短信已发送到{{ tel }}</p>
      <input
        type="number"
        class="liuui_input reginter_input"
        placeholder="请输入短信中的验证码"
        maxlength="6"
        v-model="code"
      />
      <button class="liuui_button reginter_code" @click="handleSubCode">提交验证码</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      reginter: true,
      code: ""
    };
  },
  onShow() {
    this.reginter = true;
    this.tel = "";
    this.code = "";
  },
  methods: {
    handleCode() {
      let verifyWay = /^1[3456789]\d{9}$/;
      if (verifyWay.test(this.tel)) {
        wx.setStorageSync("del", this.tel);
        console.log(this.tel);
        var data = {
          mobile: this.tel
        };
        console.log(data);
        this.$http
          .post({
            url: "/user/sendsms",
            data: {
              mobile: this.tel
            }
          })
          .then(res => {
            //如果成功提示 提现成功

            console.log(res);
          });

        this.reginter = false;
      } else {
        wx.showModal({
          title: "提示",
          content: "请填写正确的手机号",
          showCancel: false
        });
      }
    },
    handleSubCode() {
      if (this.code) {
        console.log(this.code);
        this.$http
          .post({
            url: "/user/validCode",
            data: {
              mobile: this.tel,

              validCode: this.code
            }
          })    
          .then(res => {
            //如果成功提示 提现成功
            if (res) {
              wx.setStorageSync("code", this.code);
              wx.navigateTo({
                url:
                  "../setPassword/main?tel=" +
                  this.tel +
                  "&code=" +
                  this.code +
                  "&type=0"
              });
            }
          });
      } else {
        wx.showModal({
          title: "提示",
          content: "请填写正确的验证码",
          showCancel: false
        });
      }
    }
  }
};
</script>

<style lang="wxss">
page {
  background: #f2f2f2;
}
.reginter_title {
  width: 100%;
  background: #fff;
  height: 62rpx;
  line-height: 62rpx;
  color: #101010;
  left: 45px;
  font-family: Arial;
  text-align: center;
  margin-top: 50rpx;
  font-size: 30rpx;
}
.reginter_choose {
  color: #febd00;
}
.reginter_input {
  background: #fff;
  margin-top: 18rpx;
}
.reginter_code {
  margin-top: 20rpx;
}
.reginter_note {
  text-align: center;
  margin: 30rpx auto;
  font-size: 24rpx;
  color: #101010;
}
</style>
