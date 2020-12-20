<!-- 个人中心 -->
<template>
  <div>
    <div class="person_top">
      <div class="person_message" @click="funclick()">
        <img :src="messageIcon" alt />
      </div>
      <div class="person_heard" @click="login">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <p class="person_name" @click="login">{{persondata.memberName || ''}}</p>
      <!-- <p class="person_name" @click="login" v-if="isshow">{{loginmessage || ''}}</p> -->
      <button class="person_name" open-type="getUserInfo" v-if="isshow" @getuserinfo="login">{{loginmessage || ''}}</button>
      <div class="startlist">
        <block v-for="item in starlength" :key="item">
          <img src="/static/images/forstart/WechatIMG24.png" />
        </block>
      </div>

      <div class="person_money">
        <div class="person_title">
          <p>账户金额</p>
          <p>我的积分</p>
        </div>
        <div class="person_money_num">
          <p class="person_money_account">
            {{persondata.
            accountBalance ||0}}
          </p>
          <p>
            {{persondata.
            pointBalance || 0
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="person_menu">
      <div
        class="person_menu_item"
        v-for="(menuItem,menuIndex) in menuList"
        :key="menuIndex"
        @click="forother(menuIndex,menuItem.link)"
      >
        <img :src="menuItem.icon" alt />
        <p>{{ menuItem.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: true,
      staticimg: "/static/images/index/star.svg",
      startlist: [],
      starlength: null,
      persondata: {},
      loginmessage: "登陆/注册",
      menuList: [
        {
          text: "签到",
          icon: "/static/images/person/qiandao.svg",
          link: "../SignIn/main"
        },
        {
          text: "接单",
          icon: "/static/images/person/jiedan.svg",
          link: "../index/main"
        },
        {
          text: "历史订单",
          icon: "/static/images/person/lishidingdan.svg",
          link: "../HistoricalOrder/main"
        },
        {
          text: "收入明细",
          icon: "/static/images/person/shourumingxi.svg",
          link: "../IncomeDetails/main"
        },
        {
          text: "我的收藏",
          icon: "/static/images/person/shoucang.svg",
          link: "../MyCollection/main"
        },
        {
          text: "积分兑换",
          icon: "/static/images/person/jifenduihuan.svg",
          link: "../IntegralExchange/main"
        },
        {
          text: "关于好手帮",
          icon: "/static/images/person/LOGO.png",
          link: "../IntroductionHomePage/main"
        },
        {
          text: "提现",
          icon: "/static/images/person/tixian.svg",
          link: "../deposit/main"
        }
      ],
      messageIcon: "/static/images/person/xiaoxiyou.svg"
    };
  },
  onShow() {
    if (wx.getStorageSync("data")) {
      this.loginmessage = "切换用户";
    } else {
      this.loginmessage = "登陆/注册";
    }
    this.persondata = wx.getStorageSync("data").member || {};
    if (wx.getStorageSync("pass")) {
      this.isshow = true;
    }
    this.starlength = this.persondata.star;

    for (var i = 0; i < this.starlength; i++) {
      this.startlist.push(this.staticimg);
    }

    console.log(this.startlist);
  },
  methods: {
    //登录
    login(e) {
      if (this.loginmessage == "切换用户") {
        wx.removeStorageSync("del");
        wx.removeStorageSync("data");
        wx.removeStorageSync("CHECKIN");
        wx.removeStorageSync("pass");
        wx.removeStorageSync("type");
      }

      wx.getUserInfo({
        withCredentials: false,
        success: res => {
          wx.setStorageSync('wxUserInfo',res.userInfo)
        },
        fail: () => {},
        complete: () => {}
      });
      wx.navigateTo({
        url: "../chooseReg/main"
      });
    },
    //消息中心
    funclick() {
      wx.navigateTo({
        url: "../MessageCenter/main"
      });
    },
    //菜单
    forother(index, route) {
      const USER_DATA = wx.getStorageSync("data");
      if (!USER_DATA || JSON.stringify(USER_DATA) == "{}") {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "请先登录后进行查看", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
        return;
      }
      if (index == 1) {
        console.log(index);
        wx.switchTab({
          url: "../index/main"
        });
      } else {
        wx.navigateTo({ url: route });
      }
    }
  }
};
</script>

<style lang="wxss">
.person_top {
  width: 100%;
  height: 620rpx;
  background: #febd00;
  padding-top: 40rpx;
  box-sizing: border-box;
}
.person_message {
  text-align: right;
  margin: 0rpx 40rpx 0 0;
}
.person_message img {
  width: 40rpx;
  height: 40rpx;
}
.person_heard {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
}
.person_heard img {
  width: 100%;
  height: 100%;
}
.person_name {
  font-size: 30rpx;
  margin: 10rpx auto;
  color: #fff;
  text-align: center;
}
.person_money {
  width: 100%;
  color: #fff;
  margin-top: 80rpx;
}
.person_title {
  width: 100%;
  height: 40rpx;
  display: flex;
  justify-content: space-between;
}
.person_title p {
  width: 50%;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 30rpx;
}
.person_money_num {
  width: 100%;
  height: 88rpx;
  font-size: 54rpx;
  font-weight: 800;
  display: flex;
  text-align: center;
  line-height: 88rpx;
  justify-content: space-between;
}
.person_money_num p {
  width: 100%;
}
.person_money_account {
  position: relative;
}
.person_money_account::after {
  content: "";
  position: absolute;
  top: 24rpx;
  right: 0px;
  height: 40rpx;
  width: 4rpx;
  background-color: #fff;
}
.startlist {
  /* margin-left: 45%; */
  /* display: inline-block; */
  display: flex;
  width: 100%;
  justify-content: center;
}
.startlist img {
  width: 30rpx;
  height: 30rpx;

  text-align: center;
}
.person_menu {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 70rpx;
}
.person_menu_item {
  width: 25%;
  height: 140rpx;
  text-align: center;
  margin-bottom: 64rpx;
}

.person_menu_item img {
  width: 56rpx;
  height: 56rpx;
}
.person_menu_item p {
  font-size: 30rpx;
  color: #282828;
  /* margin-top: 18rpx; */
}

button {
  color: #fff;
  background-color: transparent !important;
  font-size: 30rpx;
}
button::after {
  border: none;
}
</style>