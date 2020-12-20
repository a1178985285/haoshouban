<!-- 设置密码 -->
<template>
  <div class="login">
    <input
      class="liuui_input login_tel"
      type="password"
      placeholder="输入密码"
      minlength="8"
      maxlength="32"
      v-model="password"
    />
    <input
      class="liuui_input login_tel"
      type="password"
      placeholder="确认密码"
      minlength="8"
      maxlength="32"
      v-model="password2"
    />
    <p class="liuui_width setpassword_hint">密码长度8-32位,须包含数字、字母、符号至少2种或以上元素。</p>
    <button class="liuui_button setpassword_sub" @click="handleSubmit">确认提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      password2: "",
      tel: null
    };
  },
  mounted() {
    this.password = "";
    this.password2 = "";
    this.tel = this.$root.$mp.query.tel;
    // console.log(wx.getStorageSync("code"));
    // console.log(123);
    // console.log(wx.getStorageSync("type"));
    // console.log(this.tel);

    // console.log(wx.getStorageSync("data").member.id);
    // console.log(wx.getStorageSync("data").member);

    // console.log(this.$root.$mp.query.code);
    if (this.$root.$mp.query.type == 1) {
      wx.setNavigationBarTitle({
        title: "重置密码"
      });
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.password2.length);
      if (
        /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,32}$/.test(
          this.password2
        )
      ) {
        if (this.password && this.password2) {
          if (this.password === this.password2) {
            this.$http
              .post({
                url: "/user/register",
                data: {
                  mobile: this.tel,
                //   id: wx.getStorageSync("data").member.id,
                  memberType: wx.getStorageSync("type"),
                  validCode: wx.getStorageSync("code"),
                  openId: wx.getStorageSync("openid"),
                  // memberId: wx.getStorageSync("data").member.id,

                  passwd: this.password,
                  repeatPasswd: this.password2
                }
              })
              .then(res => {
                console.log(res);
                if (res) {
                  wx.navigateTo({
                    url: "../writePerson/main?tel=" + this.tel
                  });
                }
              });
            console.log(this.password2);
          } else {
            wx.showModal({
              title: "提示",
              content: "两次密码不一致",
              showCancel: false,
              success(res) {}
            });
          }
        } else {
          wx.showModal({
            title: "提示",
            content: "两次密码不一致",
            showCancel: false,
            success(res) {}
          });
        }
      } else {
        wx.showModal({
          title: "提示",
          content: "密码长度8-32位,须包含数字、字母、符号至少2种或以上元素",
          showCancel: false,
          success(res) {}
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
.login {
  padding-top: 18rpx;
  box-sizing: border-box;
}
.login_tel {
  margin-top: 20rpx;
  background: #fff;
}
.setpassword_hint {
  height: 68rpx;
  line-height: 68rpx;
  font-size: 24rpx;
  color: #a9a9a9;
  margin-top: 20rpx;
}
.setpassword_sub {
  margin-top: 20rpx;
}
</style>
