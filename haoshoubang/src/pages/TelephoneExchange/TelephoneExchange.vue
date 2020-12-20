<template>
    <div>
        <div class="Every-IntegralExchange" v-if="exchangeType">
          <div class="IntegralExchange-img">
                <img src="/static/images/IntegralExchange/50yuan.svg" />
          </div>
          <div class="IntegralExchange-text">
               <p>50元话费</p>
                <p class="integral">200积分</p>
          </div>
      </div>
      <div class="Every-IntegralExchange"  v-if="!exchangeType">
          <div class="IntegralExchange-img">
                <img src="/static/images/IntegralExchange/52yuan.svg" />
          </div>
          <div class="IntegralExchange-text">
               <p>100元话费</p>
                <p class="integral">400积分</p>
          </div>
      </div>
      <div class="integral_bottom">
          <p class="integral_title">运营商</p>
          <radio-group class="reginter-choose" @change="radioChangeA">
            <label v-for="item in questionA" :key="item">
                <radio :value="item.value" > <text>{{ item.name }}</text>
            </radio>
            </label>
        </radio-group>
        <p class="integral_title integral_num">数量</p>
        <input class="integral_number" type="number" value="1">
        <p class="integral_title integral_num">手机号码</p>
        <input class="integral_man" type="number" placeholder="请输入">
       
        <button class="liuui_button integral_button">确认兑换</button>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            questionA: [
              { name: "中国移动", value: 1 },
              { name: "中国联通", value: 2 },
            { name: "中国电信", value: 3 },
            ],
            radioChangeAnswera: null,
            exchangeType: null,
        }
    },
    mounted(){
        console.log(this.$root.$mp.query.type)
        if(this.$root.$mp.query.type == 50){
            this.exchangeType = true
        } else {
            this.exchangeType = false
        }
        
    },
    methods: {
        radioChangeA(e){
            this.radioChangeAnswera = e.target.value;
            console.log(this.radioChangeAnswera)
        },
    }
}
</script>

<style lang="wxss">
.Every-IntegralExchange{
    width: 310rpx;
    height: 278rpx;
    margin: 54rpx auto;
    opacity: 0.97;
    box-shadow: 0px 4rpx 6rpx 0px rgba(0, 0, 0, 0.4);
    border: 2rpx solid rgba(187, 187, 187, 1);
}
.IntegralExchange-img{
    width: 270rpx;
    height: 166rpx;
    margin-left: 20rpx;
    margin-top: 20rpx;
    
}
.IntegralExchange-img img{
    width: 100%;
    height: 100%;
}
.IntegralExchange-text{
    margin-left: 16rpx;
    font-size: 23rpx;
    margin-top: 20rpx;
}
.integral{
    color: #F15E3E ;
    font-weight: 700;
}
.integral_bottom{
    width: 92%;
    margin: auto;    
}
.integral_title{
    font-size: 28rpx;
    color: #101010;
    font-weight: 700;
}
.integral_num{
    margin-top: 32rpx;
}
.reginter-choose{
  margin-top: 20rpx;
  background: white;
  width: 100%;
  padding: 10rpx 0%;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #101010;
}
radio{
  width: 30%;
}
radio .wx-radio-input{
    border-radius: 50%; 
    width: 28rpx;
    height: 28rpx;
}
 
/* 选中后的样式 */
radio .wx-radio-input.wx-radio-input-checked::before{
    border-radius: 50%;
    width: 44rpx; 
    height: 44rpx; 
    line-height: 44rpx;
    text-align: center;
    font-size: 26rpx; /* 对勾大小 26rpx */
    color:#fff; /* 对勾颜色 */
    background: rgb(0,157,217);
    border-color: rgb(0,157,217);
}
.integral_number{
    height: 44rpx;
    width: 124rpx;
    font-size: 28rpx;
    border: 2rpx solid #aaa;
    border-radius: 6rpx;
    padding-left: 6rpx;
    margin-top: 16rpx;
}
.integral_man{
    width: 368rpx;
    height: 68rpx;
    padding: 6rpx 10rpx;
    box-sizing: border-box;
    margin-top: 16rpx;
    border: 2rpx solid #aaa;
    border-radius: 6rpx
}
.integral_address{
    widows: 100%;
    height: 80rpx;
    padding: 6rpx 10rpx;
    box-sizing: border-box;
     border: 2rpx solid #aaa;
    border-radius: 6rpx;
    margin-top: 16rpx;
}
.integral_button{
    background: #F15E3E;
    width: 100%;
    margin-top: 80rpx;
}
</style>
