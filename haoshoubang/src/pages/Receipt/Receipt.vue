<!-- 对账 -->
<template>
  <div class="Receipt-container">
    <div class="Receipt-meta">
      <div class="paragraph"></div>
      <p class="Receipt-meta-text">对账单</p>
    </div>
    <div class="Receipt-message">
      <div class="list-header">
        <p class="Main-title">{{hotelName}}</p>
        <p class="Title-Time">接单时间：{{updateDate}}</p>
      </div>

      <div class="ParagraphLine">
        <div class="Line"></div>
      </div>
      <div class="line">
        <p v-for="(item,index) in missionArray" :key="index" class="Number-of-clean-room">
          {{item.roomType}}
          <span>{{item.number}}</span>间,单价
          <span>{{item.price}}</span>
          元/间
        </p>
        <p class="Number-of-clean-room">任务时间:{{startime}}至{{endtime}}</p>

        <p class="Total">
          共计
          <span>{{amountsunt}}</span> 元
        </p>
      </div>
    </div>
    <button class="confirm-button" @click="funclick()">确认</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: null,
      hotelName: null,
      member: null,
      createDate: null,
      hotelId: null,
      missionContent: null,
      missionArray: null,
      startime: null,
      endtime: null,
      updateDate: null,
      amountsunt: 0
    };
  },
  onShow() {
    console.log("wode");
    console.log(this.$root.$mp.query.id);
    this.uid = this.$root.$mp.query.id;
    this.$http
      .post({
        url: "/hotel/detail",
        data: {
          id: this.uid
        }
      })
      .then(res => {
        console.log("新的");
        console.log(res.data.hotel);
        this.member = res.data.mission;
        this.hotelName = res.data.hotel.hotelName;
        this.createDate = res.data.hotel.createDate;
        this.hotelId = res.data.hotel.id;
        this.price = res.data.hotel.missionPrice;
        this.number = res.data.hotel.missionNumber;
        this.updateDate = res.data.hotel.updateDate;
        this.missionContent = JSON.parse(res.data.hotel.missionContent);
        this.missionArray = this.missionContent.room;
        this.amountsunt = 0;

        this.amountsunt = this.missionContent.priceTotal;

        this.startime = this.missionContent.missionStart;
        this.endtime = this.missionContent.missionEnd;
      });
  },
  methods: {
    funclick() {
      this.$http
        .post({
          url: "/order/acceptMission",
          data: {
            id: this.uid,
            hotelId: this.hotelId,
            memberId: wx.getStorageSync("data").member.id
          }
        })
        .then(res => {
          console.log(res);
        });

      wx.navigateTo({
        url: "../OrderAudit/main?time="+this.updateDate
      });
      
    }
  }
};
</script>

<style>
.Receipt-meta {
  width: 100%;
  height: 54rpx;
  margin-top: 22rpx;
}
.Receipt-meta {
  display: flex;
}
.paragraph {
  width: 6rpx;
  height: 54rpx;
  background: #febd00;
  margin-left: 28rpx;
}
.Receipt-meta-text {
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #febd00;
  font-family: SourceHanSansSC-regular;
}
.Receipt-message {
  width: 100%;
  height: auto;

  background: #414143;
  margin-top: 128rpx;
  text-align: center;
  padding: 32rpx 0;
  box-sizing: border-box;
}
.list-header {
  width: 100%;
  height: 130rpx;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.line {
  width: 100%;

  display: flex;
  flex-direction: column;
}
.line p {
  flex: 1;
}

.Main-title {
  height: 56rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-family: -apple-system;
  /* margin-top: 20rpx; */
  font-weight: 600;
  display: inline-block;
}
.Title-Time {
  height: 56rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-family: -apple-system;
  font-weight: 600;
}
.ParagraphLine {
  width: 692rpx;

  margin: 20rpx auto;
}
.Line {
  width: 100%;
  height: 4rpx;
  margin-top: 5rpx;
  background: #dedede;
}
.Number-of-clean-rooms {
  height: 70rpx;
  color: #ffffff;

  font-size: 48rpx;
}
.Number-of-clean-room {
  height: 70rpx;
  color: #ffffff;

  font-size: 32rpx;
}
span {
  color: #febd00;
}
.Unit-price {
  height: 70rpx;
  font-size: 48rpx;
  color: #ffffff;
}
.Total {
  height: 70rpx;
  font-size: 48rpx;
  color: #ffffff;
}
.confirm-button {
  width: 694rpx;
  height: 90rpx;
  background: #febd00;
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0);
  margin-top: 192rpx;
}
</style>