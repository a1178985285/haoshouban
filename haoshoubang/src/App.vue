<script>
export default {
  data(){
    return{}
  },
  beforeMount(){
    let that = this
      //    wx.login({
      //     success (res){
      //         that.$http.get({
      //           url: "pages/self/code2sessionKey.do",
      //           data:{
      //             code: res.code
      //           }
      //         }).then(res => {
      //           // console.log(res)
      //           that.$http.get({
      //             url: "pages/self/register.do",
      //             data: {
      //               unionId: res.openid
      //             }
      //           }).then(res => {
      //             wx.setStorageSync("memberId",16)
      //           })
      //         })
      //     }
      // })
  }
}
</script>

<style>
/* * {
  font-family: PingFangSC-regular;
}
.currency-page{
  padding: 42rpx 30rpx 0;
  box-sizing: border-box;
}
.currency-button{
  width: 100%;
  height: 90rpx;
  background: #FEBD00;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.liuui_input{
  width: 92%;
  height: 90rpx;
  background: #F2F2F2;
  margin: auto;
  padding-left: 16rpx;
  box-sizing: border-box;
} */
.custom-btn {
  background: transparent;
  padding: 0;
}
.custom-btn::after {
  border-color: transparent;
}
</style>
