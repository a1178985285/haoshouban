<!-- 上传纸质对账单 -->
<template>
  <div class="UploadStatement-container">
    <div class="UploadStatement-top">
      <p class="UploadStatement-top-text">拍摄时请确保照片完整、字迹清晰、亮度均衡。</p>
    </div>
    <!-- <div class="imgList">
      <img v-for="item in statements" :src="item" @click="previewImage(item)" :key="item" alt />
    </div>-->
    <div class="AddUploadStatement" v-for="item in total" :key="item">
      <div class="AddUploadStatement-box">
        <img :src="statements[item]?statements[item]:hostimg" @click="uploadIDimgFont(item)" />
      </div>
    </div>
    <p class="UploadStatement-text">点击开始上传对账单</p>
    <div class="AddUploadStatement-small-sign">
      <img src="/static/images/up/tianjiaxiao.svg" />
    </div>
    <p class="Remarks">备注</p>
    <div class="ConcreteIntroduction">
      <input type="text" v-model="formessage" placeholder="  结算相关问题请备注留言。" />
    </div>
    <button class="ConfirmSubmission" @click="next">确认提交</button>
  </div>
</template>

<script>
import upImg from "../../utils/uploadingImg";
export default {
  data() {
    return {
      hostimg: "/static/images/ups/WechatIMG12.png",
      PositiveImage: "",
      formessage: "",
      statements: [],
      total: 1
    };
  },
  onShow(){
    this.total = 1
    this.statements = []
    this.PositiveImage = ''
    this.formessage  =''
  },
  methods: {
    uploadIDimgFont(index) {
      let that = this;
      wx.chooseImage({
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          console.log(res);
          const imgArr = res.tempFilePaths;
          imgArr.forEach(item => {
            console.log(item);
            upImg.uploadImg(item, function(res) {
              console.log(res);
              if (JSON.parse(res.data).code === 200) {
                that.PositiveImage = JSON.parse(res.data).data.url;
                // that.hostimg = that.PositiveImage;
                that.statements[index-1] = that.PositiveImage;
                that.total = that.statements.length + 1;
              }
            });
          });
          //   that.IDfontImg = res.tempFilePaths[0];
          //   const tempFilePaths = res.tempFilePaths[0];
          //   upImg.uploadImg(tempFilePaths, function(res) {
          //     if (JSON.parse(res.data).code === 0) {
          //       that.PositiveImage = JSON.parse(res.data).data.url;
          //       that.hostimg = that.PositiveImage;
          //     }
          //   });
        }
      });
    },
    previewImage(url) {
      wx.previewImage({
        urls: [url] //需要预览的图片链接列表,
      });
    },
    next() {
      this.$http
        .post({
          url: "/order/saveStatements",
          data: {
            id: this.$root.$mp.query.id,
            auditRemark: this.formessage,
            statements: this.statements.join(",")
          }
        })
        .then(res => {
          console.log(res);
        });
      if (this.PositiveImage != "") {
        wx.navigateTo({
          url: "../UploadSuccess/main"
        });
      } else {
      }
    }
  }
};
</script>

<style>
.UploadStatement-top {
  width: 100%;
  height: 100rpx;
  color: #292829;
  background-color: rgba(243, 243, 243, 1);
  text-align: center;
  border: 1px solid rgba(242, 242, 242, 1);
  font-size: 28rpx;
}
.UploadStatement-top-text {
  margin-top: 40rpx;
}
.AddUploadStatement {
  width: 456rpx;
  height: 292rpx;

  border-radius: 10rpx;
  background-color: rgba(255, 0, 0, 0);
  text-align: center;
  border: 2rpx dashed rgba(187, 187, 187, 1);
  margin-left: 150rpx;
  margin-top: 42rpx;
}
.AddUploadStatement-box {
  width: 422rpx;
  height: 246rpx;

  margin-left: 18rpx;
  margin-top: 20rpx;
}
.AddUploadStatement-box img {
  width: 100%;
  height: 100%;
}
.imgList {
  display: flex;
}
.imgList img {
  width: 100rpx;
  height: 100rpx;
  margin: 14rpx;
}
.AddUploadStatement-sign {
  width: 124rpx;
  height: 124rpx;
  background: #febd00;
  border-radius: 50%;
  text-align: center;

  margin-top: 82rpx;
  display: inline-block;
}
.AddUploadStatement-small-sign img {
  width: 100%;
  height: 100%;
}
.AddUploadStatement-sign-icon {
  font-size: 70rpx;
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
  background: #febd00;
  color: #ffffff;
  margin-top: 72rpx;
  outline: none;
}
</style>