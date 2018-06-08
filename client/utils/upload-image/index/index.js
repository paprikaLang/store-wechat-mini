const app = getApp()

Page({
  data: {
    images: [
      'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
      'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg'
    ]
  },

  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let currentImages = res.tempFilePaths

        this.setData({
          images: currentImages
        })
      },
    })
    
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src
    
    wx.previewImage({
      current: src,
      urls: this.data.images
    })
  },

  onLoad: function () {
    
  },
})
