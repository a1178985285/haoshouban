<template>
<!-- 收入明细订单 -->
  <div class="Income-details-container">
        <div class="IncomeDetails_task liuui_width">
        我的收入明细
      </div>
    <div class="Income-details-hotel" v-for="(item,index) in   orderList" :key="index">
      <div class="every-Income-details">
        <div class="every-Income-meta">
          <p class="Income-meta-text">{{item.hotelName}}</p>
                    <p class="Income-meta-texts">+{{item.amount}}</p>

        </div>
          <div class="every-Income-time">
          <p class="Income-time"> {{item.updateDate}} </p>
          <p class="Income-balance">余额{{item.balance}}</p>

        </div> 
        <div class="every-Income-room" v-for="(items,indexs) in item.missionContent.room" :key="indexs"> 
          {{items.roomType}}{{items.number}}间 &nbsp;|&nbsp; 单价/￥{{items.price}}
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderList:[],
       datas:[
    {
      name:"北京亚奥国际酒店",
      money:300.00,
      month:"12月21日21:32",
      balance:845.56,
      NumberOfRooms:20,
      rental:20

    },{
      name:"北京亚奥国际酒店",
      money:300.00,
      month:"12月21日21:32",
      balance:845.56,
      NumberOfRooms:20,
      rental:20

    },{
      name:"北京亚奥国际酒店",
      money:300.00,
      month:"12月21日21:32",
      balance:845.56,
      NumberOfRooms:20,
      rental:20

    },{
      name:"北京亚奥国际酒店",
      money:300.00,
      month:"12月21日21:32",
      balance:845.56,
      NumberOfRooms:20,
      rental:20

    }
  ]
    }
  },
  mounted(){
    //发起个人的收入明细账单
      this.$http.post({
            url: '/account/incomeList',
            data:{
               
                memberId:wx.getStorageSync("data").member.id
            }
        }).then(res => {
          
            this.orderList = res.data.record
              for(let i=0;i<this.orderList.length;i++){
         this.orderList[i].missionContent = JSON.parse( this.orderList[i].missionContent);
         console.log(this.orderList)
      }
        })
  }
 


}
</script>

<style>
.IncomeDetails_task{
  margin: 26rpx 0 26rpx 26rpx;
  height: 54rpx;
  line-height: 54rpx;
  color: #FEBD00;
  font-size: 36rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
  font-weight: 700;
  position: relative;
}
.IncomeDetails_task::after{
  content: "";
  width: 6rpx;
  height: 40rpx;
  position: absolute;
  top: 9rpx;
  left: 0;
  background: #FEBD00;
}


.Income-details-text{
  margin-left: 18rpx;
  font-size: 36rpx;
  color: #FEBD00 ;
  font-family: SourceHanSansSC-regular;
}
.Income-details-hotel{
  width: 690rpx;
  height: auto;
  margin-left: 30rpx;

}
.every-Income-details{
  width: 690rpx;
  padding: 24rpx 0 30rpx;
  box-sizing: content-box;
  border-bottom: 2rpx solid #eee;
  font-size: 26rpx;

}
.every-Income-meta{
  display: flex;
  justify-content: space-between;
}
.Income-meta-text{
  font-size: 34rpx;
  margin: 0;
  color: #333;
}
.Income-meta-texts{
  font-size: 34rpx;
  color: #FFD21F ;
}
.Income-meta-money{
  color: #FEBD00 ;
  font-size: 34rpx;
}
.every-Income-time{
  display: flex;
  justify-content: space-between;
}
.Income-time{
  color: #878787 ;
}
.Income-balance{
  color: #333 ;
  font-family: -apple-system;
}
.every-Income-room{
  color: #878787 ;
  font-family: -apple-system;
}
.rictyle{
margin-top: 30rpx;
width: 730rpx;
height: 20rpx;
}
.rictyle .cir{
   width: 730rpx;
  height: 2rpx;
  background: #DEDEDE ;
  margin-top: 15rpx;

}
</style>