// 上传下载
const upUrl = 'http://www.rayxlink.com:8888/basic/file/upload' // 上传图片
const upUrl1 = 'http://www.rayxlink.com:8899/upload/uploadWord.do' // 上传文件
const downUrl = 'http://www.rayxlink.com:8899' // 下载文件
// const upUrl = 'http://localhost/service/upload/upload.do' // 上传图片
// const upUrl1 = 'http://localhost/service/upload/uploadWord.do' // 上传文件
const hostImg = '&memberId=' + wx.getStorageSync('memberId')

function uploadImg (tempFilePaths, callback) {
  wx.showLoading({
    title: '上传中'
  })
  wx.uploadFile({
    url: upUrl,
    filePath: tempFilePaths,
    name: 'filename',
    header: {
      'Content-Type': 'multipart/form-data'// 记得设置
    },
    formData: {
      'memberId': wx.getStorageSync('memberId')
    },
    success (res) {
      wx.hideLoading()
      console.log(res)
      if (JSON.parse(res.data).code === 200) {
        callback(res)
      } else {
        wx.showModal({
          title: '提示',
          content: JSON.parse(res.data).msg,
          showCancel: false
        })
      }
    }
  })
}
function uploadPdf (tempFilePaths, callback) {
  wx.showLoading({
    title: '上传中'
  })
  wx.uploadFile({
    url: upUrl2,
    filePath: tempFilePaths,
    name: 'filename',
    header: {
      'Content-Type': 'multipart/form-data'// 记得设置
    },
    formData: {
      'memberId': wx.getStorageSync('memberId')
    },
    success (res) {
      wx.hideLoading()
      if (JSON.parse(res.data).code === 200) {
        callback(res)
      } else {
        wx.showModal({
          title: '提示',
          content: JSON.parse(res.data).msg,
          showCancel: false
        })
      }
    }
  })
}
// eslint-disable-next-line no-unused-vars 上传wenjian接口
function uploadFile (tempFilePaths, name, callback) {
  wx.showLoading({
    title: '上传中'
  })
  wx.uploadFile({
    url: upUrl1,
    filePath: tempFilePaths,
    name: 'filename',
    header: {
      'Content-Type': 'multipart/form-data'// 记得设置
    },
    formData: {
      'memberId': wx.getStorageSync('memberId'),
      'name': name
    },
    success (res) {
      wx.hideLoading()
      if (JSON.parse(res.data).code === 200) {
        callback(res)
      } else {
        wx.showModal({
          title: '提示',
          content: JSON.parse(res.data).msg,
          showCancel: false
        })
      }
    },
    fail (res) {
      wx.hideLoading()
    }
  })
}
// 下载文件
function downLoad (downLoadText, callback) {
  wx.showLoading({
    title: '下载中'
  })
  wx.downloadFile({
    url: downUrl + downLoadText + hostImg,
    success (res) {
      console.log(res)
      let filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        fileType: 'docx',
        success (res) {
          wx.hideLoading()
          callback(res)
        },
        fail (res) {
          wx.hideLoading()
          callback(res)
        }
      })
    }
  })
}
// 下载图片
function downLoadImg (downLoadImgUrl, callback) {
  wx.downloadFile({
    url: downUrl + downLoadImgUrl,
    success: function (res) {
      console.log(res)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success (res) {
          callback(res)
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (err) {
          if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
            wx.openSetting({
              success (settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  console.log('获取权限成功，给出再次点击保存到相册的提示。')
                } else {
                  console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                }
              }
            })
          }
        }
      })
    }
  })
}

export default {
  uploadImg,
  uploadFile,
  uploadPdf,
  downLoad,
  downLoadImg
}
