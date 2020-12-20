<!-- 好手帮注册 -->
<template>
    <div>
        <div class="xzzc-type">
            <div class="xzzc-type-item">
                  <p class="time-meta">2019年12月22日9:22</p>
     <div class="rictyle">
        <div class="cir">

        </div>
      </div>
    <p class="AuditSituation">您的资料提交成功，正在进行审核</p>
    <div class="upsuccuess">
        <img src="/static/images/ToExamine/shenhe.svg" />
    </div>

               
                <div class="xzzc-type-detail">
                    <div><img src="/static/images/register/ditu.svg" /></div>
                   
                       
                    
                </div>
            </div>
            <!-- <img src="" alt=""> -->
        </div>
    </div>
</template>

<script>
export default {
       onUnload: function () {
        wx.reLaunch({
            url: '../OrderNotSignedIn/main',
        })
    },
    data(){
        return{
           
        }
    },
    methods: {
       
    }
}
</script>


<style lang="wxss">
page{
    background: #FFD21F;
}
.time-meta{
    font-size: 28rpx;
    color: #878787 ;
    margin-top: 64rpx;
    
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
.upsuccuess{
    width: 338rpx;
    height: 228rpx;
   
    margin-left: 206rpx;
    margin-top: 44rpx;
}
.upsuccuess img{
    width: 100%;
    height: 100%;
   
}
.AuditSituation{
   
    font-size: 28rpx;
    color: #000000 ;
    font-family: -apple-system;
}
.AuditSituation-img-box{
    width: 338rpx;
    height: 228rpx;
    
    margin-top: 78rpx;
    margin-left: 206rpx;
}
.AuditSituation-img-box img{
    width: 100%;
    height: 100%;
}
.bottom-container{
    width: 100%;
    height: 650rpx;
    background: #FFD21F ;
    

}
.bottom-container img{
    width: 100%;
    height: 100%;
}
.xzzc-type{
    width: 100%;
    height: 650rpx;
    background: #FFD21F;
    color: #282828;
}
.xzzc-type-title{
    font-size: 28rpx;
}
.xzzc-type-item{
    width: 150%;
    height: 100%;
    margin-left: -25%;
    background: #fff;
    padding: 5rpx 25% 0;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0 0 50% 50%;
}
.xzzc-type-detail{
    width: 100%;
    display: flex;
  
   
}
.xzzc-type-detail img{
    width: 100%;
    position: absolute;
    top: 700rpx;
    background: #FFD21F ;
}
.xzzc-type-detail-left{
    width: 50%;
    text-align: center;
    height: 200rpx;
}
.xzzc-type-detail-left-item{
    width: 128rpx;
    height: 128rpx;
    margin: auto;
    border-radius: 50%;
    background: #FEBD00;
}
.xzzc-type-detail-left-item img{
    width: 90rpx;
    height: 90rpx;
    margin: 19rpx auto;
    
}
.xzzc-type-detail-title{
    font-size: 34rpx;
    font-weight: 600;
    height: 70rpx;
    line-height: 70rpx;
    color: #282828;
}
.xzzc-type-detail-text{
    color: #a9a9a9;
    width: 216rpx;
    height: 56rpx;
    font-size: 18rpx;
    margin: auto;
    text-align: left;
}
.xzzc-type-detail img{
    position: absolute
}
</style>







