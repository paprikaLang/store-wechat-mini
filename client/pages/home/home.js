// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getProducts()
  },
  getProducts() {
    wx.showLoading({
      title: '商品信息加载中...',
    })
    qcloud.request({
      url: config.service.productUrl,
      success: res => {  
        if(!res.data.code) {
          this.setData({
            productList: res.data.data
          })
        } else{
          wx.showLoading({
            title: '数据下载失败...',
          })
        }
        setTimeout(function(){
          wx.hideLoading()
        }, 500)
      },
      fail: res => {
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
        wx.showLoading({
          title: '数据加载失败...',
        })
      }
    })
  },
  addToTrolley(event){
    let productId = event.currentTarget.dataset.id
    // let productList = this.data.productList
    // let product
    // for(let i = 0, len = productList.length; i < len; i++){
    //   if(productList[i].id === productId){
    //     product = productList[i]
    //     break
    //   }
    // }
    qcloud.request({
      url: config.service.addTrolley,
      login: true,
      method: 'PUT',
      data: {
        id: productId
      },
      success: res => {
        let data = res.data
        console.log(data, '======')
        if (!data.code) {
          wx.showToast({
            title: '商品已添加到购物车',
          })
        } else {
          wx.showToast({
            title: '商品添加购物车失败',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '商品添加购物车失败',
        })
      }
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