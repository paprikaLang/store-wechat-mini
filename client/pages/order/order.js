// pages/order/order.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    orderList: [
      // {
      //   id: 0,
      //   list: [{
      //     count: 1,
      //     image: 'https://product-1254205749.cos.ap-beijing.myqcloud.com/product1.jpg',
      //     name: '商品1',
      //     price: 50.5,
      //   }]
      // },
      // {
      //   id: 1,
      //   list: [{
      //     count: 1,
      //     image: 'https://product-1254205749.cos.ap-beijing.myqcloud.com/product1.jpg',
      //     name: '商品1',
      //     price: 50.5,
      //   },
      //   {
      //     count: 1,
      //     image: 'https://product-1254205749.cos.ap-beijing.myqcloud.com/product1.jpg',
      //     name: '商品2',
      //     price: 50.5,
      //   }
      //   ]
      // },
      // {
      //   id: 2,
      //   list: [{
      //     count: 1,
      //     image: 'https://product-1254205749.cos.ap-beijing.myqcloud.com/product1.jpg',
      //     name: '商品2',
      //     price: 50.5,
      //   }]
      // }
    ], // 订单列表
  },
  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
        this.getOrder()
      }
    })
  },
  getOrder() {
     wx.showLoading({
       title: '刷新订单数据...',
     })
     qcloud.request({
       url: config.service.getOrder,
       login: true,
       success: res => {
         setTimeout(() => {
           wx.hideLoading()
         })
         let data = res.data
         console.log(res,'=======------')
         if(!data.code) {
           this.setData({
             orderList: data.data
           })
         }else{
           wx.showToast({
             title: '刷新订单数据失败',
           })
         }
       },
       fail: () => {
         setTimeout(() => {
           wx.hideLoading()
         })
         wx.showToast({
           title: '刷新订单数据失败',
         })
       }

     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
        this.getOrder()
      }
    })
  
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