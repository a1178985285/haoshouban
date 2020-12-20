<template>
  <div class="interviewList">
    <div class="inner">
      <div class="search">
        <div class="search-btn" @click="handSearch">
          <img class="search-icon" src="/static/images/icon/search.svg" alt />
          <span>搜索</span>
        </div>
        <input type="search" confirm-type="search" v-model="keyWords" @confirm="handSearch" />
      </div>
      <ul class="list-warp">
        <li class="item" v-for="item in list" :key="item.id">
          <div @click="handleVideo(item.id)" class="video-warp">
            <video
              :src="item.videoUrl"
              :show-play-btn="flag"
              :show-fullscreen-btn="flag"
              :show-center-play-btn="flag"
            ></video>
          </div>
          <div class="desc">{{item.introduce}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      list: [],
      page: 1,
      limit: 4,
      total: 0,
      keyWords: ""
    };
  },
  onShow() {
    this.list = [];
    this.page = 1;
    this.total = 0
    this.getList();
  },
  onReachBottom() {
    if (this.list.length >= this.total) return;
    this.page = this.page + 1;
    this.getList();
  },
  methods: {
    handleVideo(id) {
      console.log(id);
      wx.navigateTo({ url: `../interviewDetail/main?id=${id}` });
    },
    handSearch() {
      if (this.keyWords == "") {
        wx.showModal({
          title: "提示", //提示的标题,
          content: "搜索内容不能为空", //提示的内容,
          showCancel: false, //是否显示取消按钮,
          cancelText: "取消", //取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: "#000000", //取消按钮的文字颜色,
          confirmText: "确定", //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: "#3CC51F", //确定按钮的文字颜色,
          success: res => {}
        });
        return;
      }
      this.list = [];
      this.page = 1;
      this.getList();
    },
    getList() {
      const that = this;
      this.$http
        .post({
          url: "/member/video/list",
          data: {
            page: that.page,
            limit: that.limit,
            memberName: that.keyWords
          }
        })
        .then(res => {
          that.list = [...that.list, ...res.data.video];
          that.total = res.data.total;
          wx.setStorageSync("videoList", that.list);
        });
    }
  }
};
</script>

<style>
.interviewList {
  width: 100%;
  height: 100%;
  background: #fff;
}
.inner {
  width: 686rpx;
  box-sizing: border-box;
  padding: 0 10rpx;
  margin: 28rpx auto;
}
.search {
  border-radius: 6px;
  border: 2px solid rgba(236, 236, 236, 1);
  display: flex;
  height: 76rpx;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20rpx;
  align-items: center;
  font-size: 28rpx;
  color: #848486;
}
.item{
  margin-bottom: 30rpx;
}
.search-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search input {
  width: 80%;
  height: 80%;
}
.search-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 4rpx;
}
.search-btn span {
  font-size: 28rpx;
  color: #848486;
}
.list-warp {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 28rpx;
}
.video-warp,
.video-warp video {
  width: 326rpx;
  height: 576rpx;
}
.desc {
  width: 326rpx;
  height: 130rpx;
  margin-top: 14rpx;
  color: rgba(16, 16, 16, 1);
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
