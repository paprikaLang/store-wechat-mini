// pages/detail/detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetail(options.id)
  },
  getProductDetail(id){
    wx.showLoading({
      title: '商品数据加载中...',
    })
    qcloud.request({
      url: config.service.productDetail + id,
      success: res => {
        setTimeout(()=> {
          wx.hideLoading()
        },500)
        if(!res.data.code){
          this.setData({
            product: res.data.data
          })
        }else{
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: () => {
        wx.hideLoading()
        setTimeout(() => {
           wx.navigateBack()
        },2000)
      }
    })
  },
  addToTrolley(){
    qcloud.request({
      url: config.service.addTrolley,
      login: true,
      method: 'PUT',
      data: {
        id: this.data.product.id
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
  buy() {
    wx.showLoading({
      title: '商品购买中...',
    })
    let product = Object.assign({
      count: 1
    }, this.data.product)
    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: [product],
        isInstantBuy:true
      },
      success: res => {
        setTimeout(() => {
          wx.hideLoading()
        }, 500)
        let data = res.data
        console.log(data,'======')
        if(!data.code) {
          wx.showToast({
            title: '商品购买成功',
          })
        }else {
          wx.showToast({
            title: '商品购买失败',
          })
        }
      },
      fail:() => {
        setTimeout(() => {
          wx.hideLoading()
        },500)
        
        wx.showToast({
          title: '商品购买失败',
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