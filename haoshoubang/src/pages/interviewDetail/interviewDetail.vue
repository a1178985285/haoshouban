<template>
  <div class="interviewList">
    <video
      class="video"
      :controls="flag"
      autoplay
      :show-fullscreen-btn="flag"
      :show-center-play-btn="flag"
      :src="detail.videoUrl"
    ></video>
    <div class="info-warp">
      <div class="userInfo">
        <div class="user flex">
          <img :src="user.headUrl" alt class="avatar" />
          <div class="user-right">
            <div class="user-name">{{user['memberName']}}</div>
            <div class="leave">
              <img
                v-for="item in user.star"
                :key="item"
                src="/static/images/forstart/WechatIMG24.png"
                alt
              />
            </div>
          </div>
        </div>
        <div class="desc">{{detail.introduce}}</div>
        <div class="first-info flex">
          <div class="info-item">ID:{{user.id}}</div>
          <div class="info-item">
            <img
              class="sex"
              :src="user.gender==1?'/static/images/icon/male.png':'/static/images/icon/female.png'"
              alt
            />
            {{user.gender==1?'男':'女'}}
          </div>
          <div class="info-item">{{user.age}} 岁</div>
          <div class="info-item">{{user.address || '暂无'}}</div>
          <div class="info-item">{{user.workType}}</div>

        </div>

        <div class="first-info flex">
          <!-- <div class="info-item">{{user.address || ''}}</div> -->
          <!-- <div class="info-item">{{user.age}}岁</div> -->
          <!-- <div class="info-item">{{user.workType}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      detail: null,
      user: {}
    };
  },
  onShow() {
    const id = this.$mp.query.id;
    const videoList = wx.getStorageSync("videoList");
    const [detail] = videoList.filter(item => item.id == id);
    this.detail = detail;
    this.$http
      .post({
        url: "/user/info",
        data: {
          memberId: detail.memberId
        }
      })
      .then(res => {
        this.user = res.data.member;
        console.log(this.user);
      });
  },
  methods: {}
};
</script>

<style>
.flex {
  display: flex;
  align-items: center;
}
.video {
  width: 100vw;
  height: 100vh;
}
.info-warp {
  width: 676rpx;
  margin: 40rpx auto;
}
.avatar {
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.leave img {
  width: 32rpx;
  height: 30rpx;
}
.desc {
  color: rgba(16, 16, 16, 1);
  font-size: 26rpx;
  margin: 24rpx auto;
}
.first-info {
  margin-bottom: 20rpx;
}
.info-item {
  height: 36rpx;
  padding: 6rpx 10rpx;
  margin-right: 14rpx;
  background-color: #f0f0f0;
  color: rgba(166, 166, 166, 1);
  font-size: 23rpx;
}
.sex {
  width: 20rpx;
  height: 20rpx;
}
</style>
