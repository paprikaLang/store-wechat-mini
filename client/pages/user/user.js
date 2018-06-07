// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onTapLogin:function() {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.rawData)
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
    // console.log(e.detail.userInfo)
    // this.setData({
    //   userInfo: e.detail.userInfo
    // })
   
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
    console.log('success')
    app.checkSession({
      success: ({ userInfo }) => {
        // console.log(userInfo,'success')
        this.setData({
          userInfo:userInfo
        })
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