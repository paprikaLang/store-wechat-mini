// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    commentValue: ' ',
    commentImages: []
  },
  chooseImage() {
    let currentImages = this.data.commentImages
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        currentImages = currentImages.concat(res.tempFilePaths)
        let end = currentImages.length
        let begin = Math.max(end-3,0)
        currentImages = currentImages.slice(begin,end)

        this.setData({
          commentImages: currentImages
        })
      },
    })
  },

  previewImg(event) {
    // event.Target 获取触发事件的组件
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: this.data.commentImages
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = {
      id: options.id,
      name: options.name,
      price: options.price,
      image:options.image
    }
    this.setData({
      product
    })
  },
  onInput(event){
     this.setData({
       commentValue: event.detail.value.trim()
     })
     console.log(this.data.commentValue)
  },
  uploadImage(callback) {
    let commentImages = this.data.commentImages
    let images = []
    if (commentImages.length) {
      let length = commentImages.length
      for (let i = 0; i < length; i++) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: commentImages[i],
          name: 'file',
          success: res => {
            let data = JSON.parse(res.data)
            length--

            if (!data.code) {
              images.push(data.data.imgUrl)
            }

            if (length <= 0) {
              callback && callback(images)
            }
          },
          fail: () => {
            length--
          }
        })
      }
    } else {
      callback && callback(images)
    }
  },

  addComment(event){
     let content = this.data.commentValue
     if(!content) return
     wx.showLoading({
       title: '正在发表评论...',
     })

     this.uploadImage(images => {
       qcloud.request({
         url: config.service.addComment,
         login: true,
         method: 'PUT',
         data: {
           images,
           content: content,
           product_id: this.data.product.id
         },
         success: res => {
           setTimeout(() => {
             wx.hideLoading()
           },500)
           let data = res.data
           if (!data.code) {
             wx.showToast({
               title: '发表评价成功',
             })
             setTimeout(() => {
               wx.navigateBack()
             }, 1500)
           } else {
             wx.showToast({
               title: '发表评价失败',
             })
           }
         },
         fail: res => {
           console.log(res)
           wx.showToast({
             title: '发表评论失败',
           })
         }
       })
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})