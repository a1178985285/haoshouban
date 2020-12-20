/* eslint-disable prefer-promise-reject-errors */
// 定义请求地址
const host = 'http://111.229.137.21:8899'
// const host1 = 'https://www.rayxlink.com/service/'
// const host = 'http://localhost/service/api/'
// const host1 = 'http://localhost/service' 


function request (url, method, data, header = {}) {
  // eslint-disable-next-line standard/object-curly-even-spacing
  var datas = {...data } //每次请求都加上memberId,
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: datas,
      headers: {
        'content-type': 'application/json' // 默认转为json格式
      },
      success: function (res) {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function (error) {
        reject(false)
        console.log(error)
      },
      complete: function () {
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post,
  host,
}
