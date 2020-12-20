<template>
  <div class="warp">
    <div class="no-data" v-if="list.length==0">
      没有兑换记录
    </div>
    <div class="list-warp" v-else>
      <ul>
        <li class="list-item" v-for="item in list" :key="item.orderTime">
          <div class="left">
            <img :src="item.imageUrl" alt />
            <div class="info">
              <div class="name">100元话费</div>
              <div>充值号码:{{item.phone}}</div>
              <div>兑换时间{{item.orderTime}}</div>
            </div>
          </div>
          <div class="right">
            <div class="core">{{item.points}}</div>
            <div>{{orderStatus?'处理中':'已兑换'}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this._getList();
  },
  methods: {
    _getList() {
      const USER = wx.getStorageSync("data");
      console.log(USER.member.id);

      this.$http
        .post({
          url: "/point/xchangeRecord",
          data: {
            memberId: USER.member.id
          }
        })
        .then(res => {
          const { data } = res;
          this.list = data.recordVos;
        });
    }
  }
};
</script>

<style lang="wxss">
.warp {
  width: 684rpx;
  margin: 0 auto;
}
.no-data {
  display: flex;
  justify-content: center;
  margin: 30rpx auto;
  font-size: 24rpx;
  color: #848664;
}
.list-item {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 30rpx;
  border-bottom: 1rpx solid #a9a9a9;
}
.left {
  display: flex;
  align-items: center;
}
.left img {
  width: 176rpx;
  height: 108rpx;
}
.info {
  margin-left: 24rpx;
  font-size: 23rpx;
  color: #a9a9a9;
}
.name {
  font-size: 32rpx;
  color: #333;
}
.right{
  font-size: 23rpx;
  color: #a9a9a9;
}
.core{
  color: #FEBD00;
  font-size: 44rpx;
}
</style>



