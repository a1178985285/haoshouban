<!-- 个人信息填写 -->
<template>
  <div>
    <div class="liuui_cell write_person">
      <div class="liuui_hd">姓名</div>
      <div class="liuui_bd">
        <input type="text" class="liuui_input person_input" placeholder="请输入姓名" v-model="regName" />
      </div>
    </div>
    <div class="liuui_cell write_person">
      <div class="liuui_hd">性别</div>
      <div class="liuui_bd person_choose">
        <div
          :class="['person_sex',sexPitch == sexItem.id ? 'person_pitch' : '']"
          v-for="(sexItem,sexIndex) in sex"
          :key="sexIndex"
          :data-id="sexItem.id"
          @click="handleChooseSex"
        >{{ sexItem.text }}</div>
      </div>
    </div>
    <div class="liuui_cell write_person">
      <div class="liuui_hd">年龄</div>
      <div class="liuui_bd">
        <input type="number" class="liuui_input person_input" placeholder="请输入年龄" v-model="regYear" />
      </div>
    </div>
    <div class="liuui_cell write_person">
      <div class="liuui_hd">工种</div>
      <div class="liuui_bd">
        <prick :init-list="industryList" @change="handIndustryId" />
      </div>
    </div>
    <div class="person_other" v-if="workType">
      <div class="liuui_hd">其他</div>
      <div class="liuui_bd">
        <input
          type="text"
          class="liuui_input person_input"
          maxlength="10"
          placeholder="其他"
          v-model="typeOther"
        />
      </div>
    </div>
    <button class="liuui_button person_button" @click="handleConfirm">确认</button>
  </div>
</template>

<script>
import Prick from "@/components/prick.vue";
export default {
  components: { Prick },
  data() {
    return {
      sex: [{ text: "男", id: 1 }, { text: "女", id: 0 }],
      sexPitch: 1,
      industryList: [
        { label: "客房服务员", value: 129 },
        { label: "保洁员", value: 127 },
        { label: "清洁员", value: 128 },
        { label: "餐饮服务员", value: 130 },
        { label: "其他", value: 131 }
      ],
      politicalFace: "",
      regName: "",
      regYear: "",
      typeOther: "",
      workType: false,
      tel: null
    };
  },
  mounted() {
    this.tel = this.$root.$mp.query.tel;
    console.log(this.tel);
  },
  methods: {
    handleChooseSex(e) {
      console.log(e.target.dataset.id);
      this.sexPitch = e.target.dataset.id;
    },
    //获取选择框的id
    handIndustryId(data) {
      console.log(data);
      this.politicalFace = data.id;
      console.log(data.id);
      if (data.id == 131) {
        this.workType = true;
      } else {
        this.workType = false;
      }
    },
    saveWechat(id){
      this.$http.post({
        url:'/wechat/saveWxInfo',
        data:{
          memberId:id,
          headUrl:wx.getStorageSync('wxUserInfo').avatarUrl,
          nickName:wx.getStorageSync('wxUserInfo').nickName
        }
      }).then(res=>{
        console.log(res);
      })
    },
    handleConfirm() {
      const THAT = this
      if (this.politicalFace && this.regName && this.regYear) {
        if (this.workType) {
          if (this.typeOther) {
            wx.reLaunch({
              url: "../login/main"
            });
          } else {
            wx.showModal({
              title: "提示",
              content: "请填写完整",
              showCancel: false
            });
          }
        } else {
          if (this.politicalFace == 131) {
            this.$http
              .post({
                url: "/user/saveUserInfo",
                data: {
                  // id: wx.getStorageSync("data").member.id,
                  memberName: this.regName,
                  // memberId: wx.getStorageSync("data").member.id,
                  gender: this.sexPitch,
                  age: this.regYear,
                  workType: this.politicalFace,
                  otherWorkType: this.typeOther,
                  mobile: this.tel,
                  openId: wx.getStorageSync("openid")
                }
              })
              .then(res => {
                console.log(res);
                THAT.saveWechat(res.data.member.id)
              });
          } else {
            this.$http
              .post({
                url: "/user/saveUserInfo",
                data: {
                  // id: wx.getStorageSync("data").member.id,
                  memberName: this.regName,
                  gender: this.sexPitch,
                  age: this.regYear,
                  workType: this.politicalFace,
                  mobile: this.tel,
                  openId: wx.getStorageSync("openid")
                }
              })
              .then(res => {
                console.log(res.data.member.id);
                 THAT.saveWechat(res.data.member.id)
              });
          }
          console.log(this.regName);
          wx.setStorageSync("del", this.tel);
          wx.showModal({
            title: "提示",
            content: "注册成功",
            showCancel: false
          });
          wx.reLaunch({
            url: "../index/main"
          });
        }
      } else {
        wx.showModal({
          title: "提示",
          content: "请填写完整",
          showCancel: false
        });
      }
    }
  }
};
</script>

<style lang="wxss">
.write_person {
  margin-top: 20rpx;
}
.person_sex {
  width: 108rpx;
  height: 54rpx;
  background: #aaa;
  color: #fff;
  border-radius: 8rpx;
  text-align: center;
  line-height: 54rpx;
  margin-left: 4%;
}
.person_choose {
  display: flex;
}
.person_pitch {
  background: #febd00;
}
.person_other {
  width: 78%;
  margin-left: 18%;
  border-bottom: 2rpx solid #ddd;
  height: 90rpx;
  display: flex;
  line-height: 90rpx;
  justify-content: space-between;
  align-items: center;
}
.person_button {
  margin-top: 52rpx;
}
</style>



