<template>
  <div class="MessageCenter-container">
    <div class="MessageCenter-meta">
      <div class="paragraph"></div>
      <p class="MessageCenter-meta-text">消息中心</p>
    </div>
    <div
      class="To-examine-center"
      v-for="(item,index) in messageArr"
      :key="index"
      @click="fun(item)"
    >
      <div class="To-examine-meta">
        <p class="remind">
          <span>{{item.msgTitle}}</span>
          <span class="cir" v-if="!item.readStatus"></span>
        </p>
        <p class="time">{{item.updateDate}}</p>
      </div>
      <p class="To-examine-message">{{item.msgContent}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageArr: []
    };
  },
  mounted() {
    this.$http
      .post({
        url: "/msg/myMsg",
        data: {
          memberId: wx.getStorageSync("data").member.id,
          page: 1,
          limit: 2
        }
      })
      .then(res => {
        this.messageArr = res.data.record;
      });
  },
  methods: {
    jumpSigning() {
      wx.navigateTo({
        url: "../Signing/main"
      });
    },
    fun(item) {
      this.$http
        .post({
          url: "/msg/read",
          data: {
            id: item.id
          }
        })
        .then(res => {
          console.log(res);
        });
      this.$http
        .post({
          url: "/msg/myMsg",
          data: {
            memberId: wx.getStorageSync("data").member.id,
            page: 1,
            limit: 2
          }
        })
        .then(res => {
          this.messageArr = res.data.record;
        });
    }
  }
};
</script>

<style>
.MessageCenter-meta {
  display: flex;
  margin-top: 28rpx;
}
.paragraph {
  width: 6rpx;
  height: 40rpx;
  margin-top: 7rpx;
  background: #febd00;
  margin-left: 40rpx;
}
.MessageCenter-meta-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.To-examine-center {
  width: 100%;
  padding: 20rpx 40rpx;
  box-sizing: border-box;
  border-bottom: 2rpx solid #eee;
}
.To-examine-meta {
  display: flex;
  justify-content: space-between;
}
.remind {
  font-size: 30rpx;
}
.time {
  font-size: 24rpx;
  color: #878787;
}
.To-examine-message {
  font-size: 26rpx;
  color: #878787;
  font-family: -apple-system;
  margin-top: 0rpx;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.rictyle {
  margin-top: 30rpx;
  width: 730rpx;
  height: 20rpx;
}
.rictyle .cir {
  width: 730rpx;
  height: 2rpx;
  background: #dedede;
  margin-top: 15rpx;
}
.cir {
  display: inline-block;
  width: 15rpx;
  height: 15rpx;
  border-radius: 50%;
  background: red;
}
</style>