<!-- 培训详情 -->
<template>
  <div class="trainingdetails-container">
    <!-- <div class="trainingdetails-title">
          <h3>{{ title }}</h3>
    </div>-->
    <!-- <div class="trainingdetails-img">
          <img mode="widthFix" :src="imgUrl"/>
    </div>-->

    <div class="trainingdetails-message">
      <!-- <div class="trainingdetails-text">
              <p v-html="content"></p>
      </div>-->
      <wxParse :content="content" />
    </div>
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
export default {
  components: {
    wxParse
  },
  data() {
    return {
      uid: null,
      title: null,
      imgUrl: null,
      content: null
    };
  },
  mounted() {
    console.log(this.$root.$mp.query.id);
    this.uid = this.$root.$mp.query.id;
    this.$http
      .post({
        url: "/training/detail",
        data: {
          id: this.uid
        }
      })
      .then(res => {
        console.log(res);
        this.title = res.data.trainning.title;
        this.imgUrl = res.data.trainning.imageUrl;
        this.content = res.data.trainning.content;
      });
  }
};
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
page {
  background: rgba(65, 65, 67, 1);
}
.trainingdetails-title {
  font-family: PingFangSC-bold;
  font-size: 36rpx;
  width: 100%;
  height: 300rpx;
  color: #101010;
  text-align: center;
  background: #fff;
  padding-top: 46rpx;
  box-sizing: border-box;
}
.trainingdetails-img {
  width: 688rpx;
  height: 352rpx;
  margin-top: -162rpx;
  margin-left: 30rpx;
  border: 6rpx solid #fff;
}
.trainingdetails-img img {
  width: 100%;
  height: 100%;
}
.trainingdetails-message {
  width: 97%;
  margin: 0 auto;
  top: 310rpx;
  text-align: center;
}
.wxParse .p {
  color: #fff;
}

.trainingdetails-text {
  width: 688rpx;
  height: 600rpx;
  margin: 44rpx auto;
  color: rgba(255, 255, 255, 1);
  font-size: 28rpx;
  text-align: justify;
  font-family: PingFangSC-regular;
}
</style>