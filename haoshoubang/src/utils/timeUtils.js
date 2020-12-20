// 修改时间格式
function yyMMdd (time) {
    let date = new Date(time)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    if(m < 10) {
        m = "0" + m
    }
    if(d < 10) {
        d = "0" + d
    }
  if (y && m && d) {
    return `${y}-${m}-${d}`
  }
}
function yyMMddHHmmSS (time) {
    let date = new Date(time)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let M = date.getMinutes()
    let s = date.getSeconds()
    if(m < 10) {
        m = "0" + m
    }
    if(d < 10) {
        d = "0" + d
    }
    if(h < 10){
        h = "0" + h
    }
    if(M < 10){
        M = "0" + M
    }
    if(s < 10){
        s = "0" + s
    }
  if (y && m && d && h && M && s) {
    return `${y}-${m}-${d} ${h}:${M}:${s}`
  }
}
export default {
  yyMMdd,
  yyMMddHHmmSS
}
