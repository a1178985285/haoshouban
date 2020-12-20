<template>
  <div class="sigin">
    <Calendar
      :months="months"
      :value="value"
      :events="events"
      lunar
      multi
      clean
      ref="calendar"
      :arrowLeft="arrowLeft"
      :tileContent="tileContent"
      :almanacs="almanacs"
    />
  </div>
</template>
 
<script>
import Calendar from "mpvue-calendar";
import "mpvue-calendar/src/style.css";

export default {
  data() {
    return {
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      value: [[2020, 5, 12], [2020, 5, 14]],
      begin: [],
      arrowLeft: "/static/images/person/left.svg"
    };
  },
  components: {
    Calendar
  },
  mounted() {
    let dates = new Date();
    let newDates = [];
    newDates.push(dates.getFullYear(), dates.getMonth() + 1, dates.getDate());
    // this.value = newDates;
    const THAT = this;
    this.$http
      .post({
        url: "/user/mySignin",
        data: {
          memberId: wx.getStorageSync("data").member.id
        }
      })
      .then(res => {
        // THAT.formatData(res.data.record);
        let arr = [];
        for (let i = 0; i < res.data.record.length; i++) {
          const cur = res.data.record[i];

          let tempArr = cur.signDate.replace(/\-0/, "-").split("-");
          let kArr = [];
          for (let i = 0; i < tempArr.length; i++) {
            kArr.push(parseInt(tempArr[i]));
          }
          console.log(cur, kArr);
          arr.push(kArr);
        }

        var hash = {};
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = true;
          }
        }
        this.value = result;
      });
    //   this.begin = newDates  //禁用之前的日期
  },
  methods: {
    select(val, val2) {
      console.log("选中的日期：", val2.date);
    },
    removeRepeat(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        // 判断当前项是否遍历过，是则删除，否存入obj以作对照
        if (obj.hasOwnProperty(arr[i])) {
          arr.splice(i, 1);
          i++;
        }
        obj[arr[i]] = i;
      }
      return arr;
    }
  }
};
</script>

<style lang="wxss">
.sigin {
  width: 94%;
  margin: 80rpx auto;
  border: 2rpx solid #d9d9d9;
}
.mpvue-calendar ._td.selected ._span {
  background: #febd00 !important;
}
.lunarStyle {
  pointer-events: none !important;

  cursor: default !important;
}
</style>


