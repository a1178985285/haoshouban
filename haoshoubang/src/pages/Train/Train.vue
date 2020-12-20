
<!-- 培训 -->
<template>
  <div class="train-container"> 
    <div class="train-hotel" v-for="(item,index) in datas" :key="index">
      <div class="every-hotel" @click="jumpTrainDetails(item.id)">
        <div class="hotel-img">
         <img :src="item.imageUrl" />
        </div>
        <div class="hotel-message">
          <p class="hotel-message-title" style="font-weight: 600" >{{item.title}}</p>
          <div class="hotel-message-bottom">
            <p>
              {{item.trainingTime}}
            </p>
            <div class="setimg">
              <img  src="/static/images/file/yudushu.svg" />
              <p>
                {{item.viewCount}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      datas:[],
       pages: 1,
    }
  },
  mounted(){
     this.$http.post({
      url: '/training/list',
      data:{
        page: 1,
        limit: 20
      }
    }).then(res => {
      console.log(res)
      this.datas = res.data.record
    })
     
    
  },  onReachBottom: function () {
        let _this = this
        this.pages ++;
        console.log(this)
        // this.$options.moreData(this.pages)
        this.$http.post({
            url: '/training/list',
            data:{
                page: _this.pages,
                limit: 5,
                memberId:1
            }
        }).then(res => {
            console.log(res)
            for(var i=0;i<res.data.record.length;i++){
                _this.datas.push(res.data.record[i])
            }
        })
    },
  methods: {
    jumpTrainDetails(ids){
      console.log(ids);
      this.$http.post({
      url: '/training/read',
      data:{
       id:ids
      }
    }).then(res => {
      console.log(res)
      
    })
      wx.navigateTo({
          url: "../TrainingDetails/main?id="+ids
      })
    }
    
  },

}
</script>

<style lang="wxss">
.train-container{
  width: 100%;
  padding: 30rpx;
  box-sizing: border-box;
 
}
.train-container .train-hotel .every-hotel{
  width: 100%;
  display: flex;
  padding: 30rpx 0;
  box-sizing: border-box;
  border-bottom: 2rpx solid #eee;
}
.every-hotel .hotel-img{
  width: 214rpx;
  height: 142rpx;
  background: #878787;
} 
.hotel-img img {
  width: 100%;
  height: 100%;
}
.every-hotel .hotel-message{
  width: 70%;
  height: 142rpx;
  margin-left: 20rpx;
} 
.hotel-message-title{
  font-size: 30rpx;
  font-family: SourceHanSansSC-regular;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;
  text-align: justify;
  height: 94rpx;
}
.hotel-message-bottom{
  width: 100%;
  margin-top: 15rpx;
  height: 32rpx;
  font-size: 24rpx;
  font-family: -apple-system;
  color:#878787;
  display: flex;
  justify-content: space-between;
}
.setimg{
  display: flex;
  align-items: center;
}
.setimg img {
  width: 28rpx;
  height: 28rpx;
  margin-right: 2rpx;
  margin-top: 4rpx;
}


</style>