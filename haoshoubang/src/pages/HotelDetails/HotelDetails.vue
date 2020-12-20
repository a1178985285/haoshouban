<!-- 酒店详情 -->
<template>
  <div class="hotelDetails-container">
    <div class="hotelDetails-img">
      <img src="/static/images/test.jpg" />
    </div>
    <div class="hotelDetails-message">
      <div class="hotelDetails-text">
        <div class="hotelDetails-meta">
          <div class="hotelDetails-meta-top">
            <p>北京亚奥国际酒店</p>
            <p>收藏</p>
          </div>
          <div class="ParagraphHorizontalLine">
            <div class="line"></div>
          </div>
        </div>
        <p>北京亚奥国际酒店由美国最佳西方酒店集团管理，位于八达岭高速北沙滩桥边，紧邻奥林匹克公园以及鸟巢、水立方等奥运场馆，交通十分便利。酒店拥有客房430间（套），配备高速宽带无线上网，可提供远程视频会议、保险箱、熨衣板、境外卫星电视等设施。酒店同时配置了大小不同的会议室供会议需要，提供专业会议秘书服务，还提供商务中心、翻译、旅游机票等服务。酒店还提供大型酒会、冷餐会、各种风格不同的西餐美食、宴会。特色商场、美容美发、足疗保健、美体健身。</p>
        <div class="ParagraphHorizontalLine">
          <div class="line"></div>
        </div>
        <div class="hotelDetails-address">
          <p>酒店地址：北京市朝阳区北沙滩大屯路甲一号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.hotelDetails-title {
  width: 568rpx;
  height: 52rpx;
  font-family: PingFangSC-bold;
  font-size: 36rpx;
  color: #101010;
  margin-top: 48rpx;
  margin-left: 90rpx;
  text-align: center;
}
.hotelDetails-img {
  width: 688rpx;
  height: 352rpx;
  background: red;
  margin-top: 40rpx;
  margin-left: 30rpx;
  position: relative;
  z-index: 9999;
}
.hotelDetails-img img {
  width: 100%;
  height: 100%;
}
.hotelDetails-message {
  width: 750rpx;
  height: 908rpx;

  top: 290rpx;
  overflow: auto;

  position: absolute;
  background-color: rgba(65, 65, 67, 1);
  text-align: center;
}
.hotelDetails-text {
  width: 688rpx;
  height: 600rpx;

  margin-left: 30rpx;
  margin-top: 130rpx;

  color: rgba(255, 255, 255, 1);
  font-size: 28rpx;
  text-align: justify;
  font-family: PingFangSC-regular;
}
.hotelDetails-meta {
  width: 688rpx;
  height: 90rpx;

  font-size: 28rpx;
  font-family: -apple-system;
  color: rgb(255, 254, 254);
}
.hotelDetails-meta-top {
  display: flex;
  justify-content: space-between;
}
.ParagraphHorizontalLine {
  width: 688rpx;
  height: 40rpx;

  margin-top: 10rpx;
}
.line {
  width: 100%;
  height: 2rpx;
  margin-top: 20rpx;
  background: #dedede;
}
.hotelDetails-address {
  width: 688rpx;
  height: 56rpx;

  line-height: 56rpx;
  font-size: 22rpx;
  font-family: -apple-system;
}
</style>