<template>
  <div class="OrderAudit-container">
      <div class="xzzc-type">
            <div class="xzzc-type-item">
      <div class="OrderAudit-time">
        接单时间：{{time}}
      </div>
         <div class="rictyle">
        <div class="cir">

        </div>
      </div>
      <div class="OrderAudit-message">
          <p>
            接单后请等待后台审核，保持电话畅通。订单通过审核后订单状态将显示为已接单状态。
          </p>
          <!-- <p style="text-align:left;"></p> -->
          
      </div>
      <div class="AuditSituation-img-box">
          <img src="/static/images/ToExamine/shenhe.svg" />
    </div>
</div>
        </div>
    <div class="bottom-container">
         <img src="/static/images/register/ditu.svg" />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      time:''
    }
  },
  onShow(){
    this.time = this.$mp.query.time
  },
 onUnload: function () {
    wx.reLaunch({
      url: '../index/index.vue'
    })
  },
}
</script>

<style>
page{
    background: #FFD21F;
}
.OrderAudit-time{
    height: 56rpx;
    font-size: 26rpx;
    line-height: 56rpx;
    margin: 70rpx auto 0;
    color: #878787 ;
    text-align: center;
    display: inline-block;
}
.OrderAudit-message{
    width: 100%;
    height: 96rpx;
    font-size: 28rpx;
    margin-top: 25rpx;
    padding: 0rpx 28rpx;
    box-sizing: border-box;
    color: #282828 ;
    text-align: center;
}
.OrderAudit-message p{
  text-indent: 56rpx;
  text-align: left;
}
.AuditSituation-img-box{
    width: 338rpx;
    height: 228rpx;
    margin-top: 50rpx;
    margin-left: 206rpx;
}
.AuditSituation-img-box img{
    width: 100%;
    height: 100%;
}
.bottom-container{
    width: 100%;
    /* height: 650rpx; */
    background: #FFD21F ;
    
}
.bottom-container img{
    width: 100%;
    margin: auto;
}
.xzzc-type{
    width: 100%;
    height: 650rpx;
    background: #FFD21F;
    color: #282828;
}
.xzzc-type-item{
    width: 150%;
    height: 100%;
    margin-left: -25%;
    background: #fff;
    padding: 0rpx 25% 0;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0 0 50% 50%;
}
.rictyle{
  margin-left: 30rpx;
margin-top: 30rpx;
width: 690rpx;
height: 20rpx;

}
.rictyle .cir{
   width: 690rpx;
  height: 2rpx;
  background: #DEDEDE ;
  margin-top: 15rpx;

}

</style>