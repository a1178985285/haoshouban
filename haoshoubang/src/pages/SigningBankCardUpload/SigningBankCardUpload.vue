<!-- 上传纸质对账单 -->
<template>
  <div class="UploadStatement-container">
    <div class="UploadStatement-top">
      <p class="VerifyIdentity">仅用于完成订单后的提现</p>
      <p class="UploadStatement-top-text">拍摄时请确保照片完整、字迹清晰、亮度均衡。</p>
    </div>
    <div class="AddUploadStatement-container">
      <div class="AddUploadStatement">
        <div class="AddUploadStatement-box">
          <img :src="hostimg" @click="uploadIDimgFont" />
        </div>
      </div>
      <p class="UploadStatement-text">
        点击开始上传
        <span class="BankCard">银行卡正面照片面</span>
      </p>
    </div>
    <div class="ConfirmSubmission-container">
      <button :class="{ConfirmSubmission: !isshow,active: isshow}" @click="fornext()">下一步</button>
    </div>
  </div>
</template>

<script>
import upImg from "../../utils/uploadingImg";
export default {
  data() {
    return {
      isshow: false,
      PositiveImage: "",
      hostimg: "/static/images/ups/WechatIMG12.png"
    };
  },
  mounted() {},
  methods: {
    fornext() {
      this.$http
        .post({
          url: "/user/saveBankCard",
          data: {
            id: wx.getStorageSync("data").member.id,
            bankcardImg: this.PositiveImage
          }
        })
        .then(res => {
          console.log(res);
          this.datas = res.data.record;
        });
      if (this.PositiveImage != "") {
        wx.navigateTo({
          url: "../FillInTheEmergencyContact/main"
        });
      }
    },
    uploadIDimgFont() {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          console.log(res);
          that.IDfontImg = res.tempFilePaths[0];
          const tempFilePaths = res.tempFilePaths[0];
          upImg.uploadImg(tempFilePaths, function(res) {
            if (JSON.parse(res.data).code === 200) {
              that.PositiveImage = JSON.parse(res.data).data.url;
              if (that.PositiveImage != "") {
                that.isshow = true;
              }
              that.hostimg = that.PositiveImage;
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.UploadStatement-top {
  width: 100%;
  height: 144rpx;
  color: #292829;
  background-color: rgba(243, 243, 243, 1);

  border: 1px solid rgba(242, 242, 242, 1);
  font-size: 28rpx;
}
.UploadStatement-top-text {
  margin-left: 30rpx;
  font-size: 28rpx;
}
.AddUploadStatement-container {
  width: 100%;
  height: 500rpx;
}
.AddUploadStatement {
  width: 292rpx;
  height: 188rpx;

  border-radius: 10rpx;
  background-color: rgba(255, 0, 0, 0);
  text-align: center;
  border: 2rpx dashed rgba(187, 187, 187, 1);
  margin-left: 228rpx;
  margin-top: 200rpx;
}
.AddUploadStatement-box {
  width: 270rpx;
  height: 158rpx;
  background: #f7f7f7;
  margin-left: 12rpx;
  margin-top: 20rpx;
}
.AddUploadStatement-box img {
  width: 100%;
  height: 100%;
}
.AddUploadStatement-sign {
  width: 80rpx;
  height: 80rpx;
  background: #febd00;
  border-radius: 50%;
  text-align: center;

  margin-top: 38rpx;
  display: inline-block;
}
.AddUploadStatement-sign img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.AddUploadStatement-sign-icon {
  font-size: 50rpx;
  color: #f7f7f7;
}
.UploadStatement-text {
  margin-top: 16rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: -apple-system;
}
.AddUploadStatement-small-sign {
  width: 74rpx;
  height: 74rpx;
  background: #febd00;
  border-radius: 50%;
  color: rgb(243, 243, 243);
  text-align: center;
  line-height: 74rpx;

  margin: 30rpx auto;
}
.Remarks {
  font-size: 28rpx;
  font-family: PingFangSC-bold;
  margin-left: 28rpx;
  font-weight: 900;
}
.ConcreteIntroduction {
  width: 690rpx;
  height: 132rpx;
  margin-left: 30rpx;
  border-radius: 8rpx 8rpx 8rpx 8rpx;
  background-color: rgba(255, 255, 255, 1);
  font-size: 22rpx;

  border: 2rpx solid rgba(220, 223, 230, 1);
  margin-top: 10rpx;
}
.ConcreteIntroduction p {
  margin-left: 10rpx;
  margin-top: 10rpx;
  color: #878787;
  font-family: -apple-system;
}
.ConfirmSubmission {
  width: 686rpx;
  height: 90rpx;
  background: #cccccc;
  color: #ffffff;
  margin-top: 72rpx;
  outline: none;
  margin-left: 26rpx;
  margin-top: 64rpx;
  display: inline-block;
}
.VerifyIdentity {
  font-size: 28rpx;
  color: #b7b7b7;
  margin-top: 40rpx;
  margin-left: 30rpx;
}
.BankCard {
  font-size: 28rpx;
  color: #febd00;
  font-family: -apple-system;
}
.ConfirmSubmission-container {
  width: 100%;
  height: 370rpx;
  background: #f3f3f3;
}
.active {
  width: 686rpx;
  height: 90rpx;
  background: #febd00;
  color: #ffffff;
  margin-top: 72rpx;
  outline: none;
  margin-left: 26rpx;
  margin-top: 64rpx;
  display: inline-block;
}
</style>