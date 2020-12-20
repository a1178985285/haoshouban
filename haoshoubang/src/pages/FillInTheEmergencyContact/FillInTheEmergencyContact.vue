<!-- 个人信息填写 -->
<template>
  <div>
    <div class="liuui_cell_container">
      <div
        class="liuui_cell write_person"
        style="width:100%;height:110rpx;display:flex; justify-content:left;align-items: center;line-height: 110rpx;"
      >
        <div class="liuui_hd" style="line-height: 110rpx;margin-left: 30rpx;">
          <p>紧急联系人姓名:</p>
        </div>
        <div class="liuui_bd" style="display:flex; justify-content:left;align-items: center;">
          <input
            type="text"
            class="liuui_input person_input"
            style="line-height: 110rpx;display:flex; justify-content:left;"
            placeholder="请输入姓名"
            v-model="regName"
          />
        </div>
      </div>
      <div
        class="liuui_cell write_person"
        style="width:100%;height:110rpx;display:flex; justify-content:center;align-items: center;line-height: 110rpx;"
      >
        <div
          class="liuui_hd"
          style="display:flex; justify-content:left;align-items: center; margin-left: 30rpx;"
        >
          <p>联系电话:</p>
        </div>
        <div class="liuui_bd" style="display:flex; justify-content:left;align-items: center;">
          <input
            type="text"
            class="liuui_input person_input"
            maxlength="11"
            placeholder="请输入手机号"
            style="line-height: 110rpx;display:flex; justify-content:left;"
            v-model="regPhone"
          />
        </div>
      </div>
      <div
        class="liuui_cell write_person"
        style="border:none;width:100%;height:110rpx;display:flex; justify-content:center;align-items: center;line-height: 110rpx;"
      >
        <div
          class="liuui_hd"
          style="display:flex; justify-content:left;align-items: center; margin-left: 30rpx;"
        >
          <p>通讯地址:</p>
        </div>
        <div class="liuui_bd" style="display:flex; justify-content:left;align-items: center;">
          <input
            type="text"
            class="liuui_input person_input"
            style="line-height: 110rpx;display:flex; justify-content:left;"
            placeholder="请输入地址"
            v-model="regAddress"
          />
        </div>
      </div>
    </div>
    <button class="liuui_button person_button" @click="handleConfirm" style="margin-top:120rpx">提交</button>
  </div>
</template>

<script>
import Prick from "@/components/prick.vue";
export default {
  components: { Prick },

  data() {
    return {
      regName: "",
      regPhone: "",
      regAddress: "",
    };
  },
  methods: {
    handleConfirm() {
      if (this.regName == "") {
        wx.showModal({
          title: "提示",
          content: "请填写紧急联系人姓名",
          showCancel: false
        });
        return
      }
      if (!/^1[34578]\d{9}$/.test(this.regPhone)) {
        wx.showModal({
          title: "提示",
          content: "请填写正确的手机号",
          showCancel: false
        });
        return;
      }
      if (this.regAddress.length < 7) {
        wx.showModal({
          title: "提示",
          content: "请输入详细的地址",
          showCancel: false
        });
        return;
      }

      this.$fly
        .post(this.$base_url + "/user/saveLinkman", {
          id: wx.getStorageSync("data").member.id,
          linkmanName: this.regName,
          linkmanAddress: this.regAddress,
          linkmanMobile: this.regPhone
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      //           this.$http.post({
      //     url: '/user/saveLinkman',
      //     data:{
      //         id:70,
      //         linkmanName:this.regName,
      //         linkmanAddress:this.regAddress,
      //         linkmanMobile:this.regPhone

      //     }
      // }).then(res => {
      //     console.log(res);

      // })
      wx.navigateTo({
        url: "../SuccessfulContractSubmission/main"
      });
    }
  }
};
</script>

<style lang="wxss">
body {
  background: #e5e5e5;
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

  height: 90rpx;
  display: flex;
  line-height: 90rpx;
  justify-content: space-between;
  align-items: center;
}
.liuui_cell_container {
  margin-top: 52rpx;
  background: #fcfcfc;
}
.liuui_cell write_person {
  margin-top: 80rpx;
}
.liuui_hd {
  width: 280rpx;
  text-align: left;
  font-weight: 500;
}
.liuui_button person_button {
  margin-top: 122rpx;
}
.liuui_bd {
  color: #878787;
}
.liuui_input {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>



