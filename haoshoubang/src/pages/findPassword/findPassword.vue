<!-- 忘记密码 -->
<template>
    <div class="reginter">
        <div v-if="reginter">
            <div class="reginter_title">
                <span class="reginter_choose">1.注册时的手机号</span> > <span>2.输入验证码</span> > <span>3.重置密码</span>
            </div>
            <input type="number" class="liuui_input reginter_input" placeholder="请输入您注册时的手机号" maxlength="11" v-model="tel">
            <button class="liuui_button reginter_code" @click="handleCode">获取验证码</button>
        </div>
        <div v-if="!reginter">
            <div class="reginter_title">
                <span>1.注册时的手机号</span> > <span class="reginter_choose">2.输入验证码</span> > <span>3.重置密码</span>
            </div>
            <p class="liu_width reginter_note">验证码短信已发送到{{ tel }}</p>
            <input type="number" class="liuui_input reginter_input" placeholder="请输入短信中的验证码" maxlength="6" v-model="code">
            <button class="liuui_button reginter_code" @click="handleSubCode">提交验证码</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tel: '',
            reginter: true,
            code: '',
        }
    },
    onShow(){
        this.reginter = true;
        this.tel = "";
        this.code = "";
    },
    methods: {
        handleCode(){
            let verifyWay = /^1[3456789]\d{9}$/;
            if( verifyWay.test(this.tel) ){
                console.log(this.tel)
                this.reginter = false
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请填写正确的手机号',
                    showCancel: false,
                })
            }
        },
        handleSubCode(){
            if(this.code){
                console.log(this.code)
                wx.navigateTo({
                    url: '../setPassword/main?tel=' + this.tel + "&code=" + this.code + "&type=1"
                })
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请填写正确的验证码',
                    showCancel: false,
                })
            }
        }
    }
}
</script>

<style lang="wxss">
page{
    background: #F2F2F2;
}
.reginter_title{
    width: 100%;
    background: #fff;
    height: 62rpx;
    line-height: 62rpx;
    color: #101010;
    left: 45px;
    font-family: Arial;
    text-align: center;
    margin-top: 50rpx;
    font-size: 30rpx;
}
.reginter_choose{
    color: #FEBD00;
}
.reginter_input{
    background: #fff;
    margin-top: 18rpx;
}
.reginter_code{
    margin-top: 20rpx;
}
.reginter_note{
    text-align: center;
    margin: 30rpx auto;
    font-size: 24rpx;
    color: #101010;
}
</style>
