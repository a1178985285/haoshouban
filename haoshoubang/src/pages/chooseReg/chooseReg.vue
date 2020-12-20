<!-- 好手帮注册 -->
<template>
  <div>
    <div class="xzzc-type">
      <div class="xzzc-type-item">
        <p class="xzzc-type-title">请选择注册类别</p>
        <div class="xzzc-type-detail">
          <div class="xzzc-type-detail-left" v-for="(item,index) in detailList" :key="index">
            <div class="xzzc-type-detail-left-item" @click="handleReg" :data-index="index">
              <img :src="item.icon" alt />
            </div>
            <p
              class="xzzc-type-detail-title"
              @click="handleCheck"
              :data-index="index"
            >{{ item.title }}</p>
            <p
              :class="['xzzc-type-detail-text',handleIndex == index ? 'tishi-show' : '']"
            >{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div :style="{height: swiperHeight + 'rpx'}" class="choose">
      <img src="/static/images/register/ditu.svg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [
        {
          text: "从事客房清洁服务、餐饮小时工、保洁员等职位。",
          title: "注册帮客",
          icon: "/static/images/register/bangke.svg"
        },
        {
          text:
            "从事酒店外包服务3年以上，具有客房领队或餐饮小时工资源。可独立承接客房清洁服务或餐饮小时工服务。具有独立运营能力。",
          title: "注册经纪人",
          icon: "/static/images/register/jingjiren.svg"
        }
      ],
      swiperHeight: 0,
      handleIndex: null
    };
  },
  beforeMount() {
    let windowHeight = wx.getSystemInfoSync().windowHeight; // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕的宽度
    this.swiperHeight = windowHeight * 750 / windowWidth - 750;
  },
  methods: {
    //展示提示
    handleCheck(e) {
     
      this.handleIndex = e.target.dataset.index;
      console.log(123);
      console.log(this.handleIndex)
      
    },
    //登录注册
    handleReg(e) {
      console.log(123);
      console.log(e.currentTarget.dataset.index);
      wx.setStorageSync("type",e.currentTarget.dataset.index);
      wx.navigateTo({
        url: "../login/main"
      });
    }
  }
};
</script>


<style lang="wxss">
page {
  background: #ffd21f;
}
.xzzc-type {
  width: 100%;
  height: 750rpx;
  background: #ffd21f;
  color: #282828;
}
.xzzc-type-title {
  font-size: 28rpx;
}
.xzzc-type-item {
  width: 150%;
  height: 100%;
  margin-left: -25%;
  background: #fff;
  padding: 90rpx 25% 0;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0 0 50% 50%;
}
.xzzc-type-detail {
  width: 100%;
  display: flex;
  margin-top: 102rpx;
}
.xzzc-type-detail-left {
  width: 50%;
  text-align: center;
  height: 200rpx;
}
.xzzc-type-detail-left-item {
  width: 128rpx;
  height: 128rpx;
  margin: auto;
  border-radius: 50%;
  background: #ffd21f;
}
.xzzc-type-detail-left-item img {
  width: 90rpx;
  height: 90rpx;
  margin: 21rpx auto;
}
.xzzc-type-detail-title {
  font-size: 34rpx;
  font-weight: 700;
  height: 70rpx;
  line-height: 70rpx;
  color: #282828;
}
.xzzc-type-detail-text {
  color: #a9a9a9;
  width: 216rpx;
  height: 56rpx;
  font-size: 18rpx;
  margin: auto;
  text-align: left;
  display: none;
  text-align: justify;
}
.tishi-show {
  display: block;
}
.choose {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.choose img {
  width: 100%;
}
</style>







