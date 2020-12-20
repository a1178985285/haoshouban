<!-- 登录 -->
<template>
  <div class="login">
    <input
      class="liuui_input login_tel"
      type="number"
      placeholder="手机号"
      maxlength="11"
      v-model="tel"
    />
    <input
      class="liuui_input login_tel"
      type="password"
      placeholder="登录密码"
      maxlength="32"
      v-model="password"
    />
    <button class="liuui_button login_button" @click="login">登录</button>
    <div class="login_choose">
      <span @click="handleReg">手机快速注册</span>
      <span @click="forgetPassword">忘记密码</span>
    </div>
    <div class="liuui_width login_other">
      <div class="login_title">第三方登录</div>

      <button
        class="login_icon"
        @click="fun"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        <img src="../../../static/images/icon/wechat.svg" />
      </button>

      <!-- <div class="login_icon" @click="fun">
      
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      password: ""
    };
  },
  mounted() {
    wx.setStorageSync("pass", 0);
  },
  methods: {
    login() {
      let verifyWay = /^1[3456789]\d{9}$/;
      if (verifyWay.test(this.tel) && this.password) {
        this.$http
          .post({
            url: "/user/login",
            data: {
              memberId: wx.getStorageSync("data").member.id,
              passwd: this.password,
              mobile: this.tel
            }
          })
          .then(res => {
            if (res) {
              wx.setStorageSync("data", res.data);
              wx.setStorageSync("pass", 1);

              wx.reLaunch({
                url: "../index/main"
              });
            }
          });
      } else {
        wx.showModal({
          title: "提示",
          content: "请填写完整或填写正确的手机号",
          showCancel: false
        });
      }
    },
    fun() {
      // wx.reLaunch({
      //   url: "../index/main"
      // });
    },
    handleReg() {
      wx.navigateTo({
        url: "../register/main"
      });
    },
    forgetPassword() {
      wx.navigateTo({
        url: "../findPassword/main"
      });
    },
    getPhoneNumber(e) {
      const THAT = this;
      if (typeof e.target["iv"] == "string") {
        wx.checkSession({
          success: res => {
            THAT.$http
              .post({
                url: "/district/getMobile",
                data: {
                  sessionKey: wx.getStorageSync("session_key"),
                  encryptedData: e.target.encryptedData,
                  iv: e.target.iv
                }
              })
              .then(response => {
                let telInfo = JSON.parse(response.data.json);
                wx.showLoading({
                  title: '正在登陆', //提示的内容,
                  mask: true, //显示透明蒙层，防止触摸穿透,
                  success: res => {}
                });
                wx.login({
                  success: code => {
                    THAT.$http
                      .post({
                        url: "/wechat/getOpenid",
                        data: {
                          code: code.code,
                          mobile: telInfo.phoneNumber
                        }
                      })
                      .then(userInfo => {
                        console.log(userInfo.data);
                        if (JSON.stringify(userInfo.data) == "{}") {
                          wx.navigateTo({
                            url:
                              "/pages/writePerson/main?tel=" +
                              telInfo.phoneNumber
                          });
                          return;
                        }
                        wx.setStorageSync("data", userInfo.data);
                        wx.setStorageSync("del", telInfo.phoneNumber);
                        // if (res.data.member.memberName) {
                        //   const CHECKIN = wx.getStorageSync("CHECKIN");
                        //   if (CHECKIN) {
                        //     let newData = that.formatTime(new Date());
                        //     let oldDate = that.formatTime(CHECKIN);
                        //     if (nowM != oldM) {
                        //       THAT.sign = true;
                        //     } else {
                        //       THAT.sign = false;
                        //     }
                        //   } else {
                        //     THAT.sign = true;
                        //     wx.setStorageSync("CHECKIN", new Date());
                        //   }
                        // }
                        // console.log(1111111111111111111111111111111111111);
                        wx.hideLoading();
                        wx.switchTab({ url: "/pages/person/main" });
                      });
                  }
                });
                // TAHT.getUserInfo(telInfo.phoneNumber);
              });
          },
          fail: () => {
            console.log("sessionKey过期");
          },
          complete: () => {}
        });

        // wx.navigateTo({ url: "/pages/writePerson/main" });
      } else {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "授权失败", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
      }
    },
    getUserInfo(telInfo) {
      console.log(telInfo);
      const THAT = this;
      // wx.login({
      //   success(res) {
      //     THAT.$http
      //       .post({
      //         url: "/wechat/getOpenid",
      //         data: {
      //           code: res.code,
      //           mobile: telInfo
      //         }
      //       })
      //       .then(res => {
      //         if (!res.data) {
      //           wx.navigateTo({
      //             url: "/pages/writePerson/main?tel=" + telInfo.phoneNumber
      //           });
      //           return;
      //         }
      //         wx.setStorageSync("data", res.data);
      //         if (res.data.member.memberName) {
      //           const CHECKIN = wx.getStorageSync("CHECKIN");
      //           if (CHECKIN) {
      //             let newData = that.formatTime(new Date());
      //             let oldDate = that.formatTime(CHECKIN);
      //             if (nowM != oldM) {
      //               THAT.sign = true;
      //             } else {
      //               THAT.sign = false;
      //             }
      //           } else {
      //             THAT.sign = true;
      //             wx.setStorageSync("CHECKIN", new Date());
      //             wx.navigateTo({ url: "/pages/person/main" });
      //           }
      //         }
      //       });
      //   }
      // });
    }
  }
};
</script>

<style lang="wxss">
.login {
  padding-top: 18rpx;
  box-sizing: border-box;
}
.login_tel {
  margin-top: 20rpx;
  background: #f2f2f2;
}
.login_password {
  margin-top: 20rpx;
}
.login_button {
  margin-top: 62rpx;
}
.login_choose {
  display: flex;
  width: 92%;
  margin: 30rpx auto;
  justify-content: space-between;
  font-size: 28rpx;
  color: #282828;
}
.login_other {
  border-top: 2rpx solid #a9a9a9;
  position: fixed;
  bottom: 26rpx;
  left: 4%;
}
.login_title {
  width: 200rpx;
  background: #fff;
  color: #a9a9a9;
  font-size: 28rpx;
  text-align: center;
  margin: -24rpx auto;
}
.login_icon {
  width: 100rpx;
  height: 100rpx;
  margin: 40rpx auto;
  text-align: center;
  padding: 0;
  background: transparent;
}
.login_icon::after {
  border-color: transparent;
}
.login_icon img {
  width: 80rpx;
  height: 80rpx;
}
</style>
