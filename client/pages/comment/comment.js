// pages/comment/comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    commentList:[
      {
   avatar:
'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqkiauGbAvVSsqq9HfxdC3GYYwJiboFzrvKhiafObn4rC4T4BBnTccicak2RibSnS8RYGkmWExQmSbWQ6A/132',
        username:'老狼',
        content:'good',
        createTime:'2018-6-8'
      },
      {
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqkiauGbAvVSsqq9HfxdC3GYYwJiboFzrvKhiafObn4rC4T4BBnTccicak2RibSnS8RYGkmWExQmSbWQ6A/132',
        username: '老狼',
        content: 'nice',
        createTime: '2018-6-8'
      }
    ]
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList,
      data: {
        product_id: id
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            commentList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              return item
            })
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({
        product: options
      })
    }
    this.getCommentList(options.id)
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