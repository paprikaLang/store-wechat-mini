// pages/trolley/trolley.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({
  data: {
    userInfo: null,
    trolleyList: [],
    trolleyCheckMap: [], // 购物车中选中的id哈希表
    trolleyAccount: 0, // 购物车结算总价
    isTrolleyEdit: false, // 购物车是否处于编辑状态
    isTrolleyTotalCheck: false, // 购物车中商品是否全选
  },
  onTapLogin(){
     app.login({
        success: ({ userInfo }) => {
         this.setData({
           userInfo
         })
         this.getTrolley()
        }
     })
  },
  onTapPay(){
    if(!this.data.trolleyAccount) return
    wx.showLoading({
      title: '结算中...',
    })
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList

    let needToPayProductList = trolleyList.filter(product => {
      return !!trolleyCheckMap[product.id] //空或者undefined!!号之后转为false
    })
    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: needToPayProductList
      },
      success: res => {
        setTimeout(() => {
          wx.hideLoading()
        },500)
        let data = res.data
        if(!data.code){
          wx.showToast({
            title: '结算成功',
          })
          this.getTrolley()
        }else{
          wx.showToast({
            title: '结算失败',
          })
        }
      },
      fail: () => {
        setTimeout(() => {
          wx.hideLoading()
        }, 500)
        wx.showToast({
          title: '结算失败',
        })
      }
    })
  },
  onTapEdit(){
    let isTrolleyEdit = this.data.isTrolleyEdit
    if(isTrolleyEdit){
      this.updateTrolley()
    }else{
      this.setData({
        isTrolleyEdit: !isTrolleyEdit
      })
    }
  },
  adjustCount(event) {
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList
    let dataset = event.currentTarget.dataset
    let adjustType = dataset.type
    let productId = dataset.id
    let product
    let index
    for(index = 0; index < trolleyList.length; index++){
       if(productId === trolleyList[index].id){
         product = trolleyList[index]
         break
       }
    }
    if(product){
      if(adjustType === 'add'){
        product.count++
      }else{
        if(product.count <= 1){
          delete trolleyCheckMap[productId]
          trolleyList.splice(index,1)
        }else{
          product.count--
        }
      }
    }
    let trolleyAccount = this.totalPrice(trolleyList,trolleyCheckMap)
    this.setData({
      trolleyAccount,
      trolleyList,
      trolleyCheckMap
    })
  },
  onTapCheckTotal(event){
     let trolleyCheckMap = this.data.trolleyCheckMap
     let trolleyList = this.data.trolleyList
     let trolleyAccount = this.data.trolleyAccount
     let isTrolleyTotalCheck = this.data.isTrolleyTotalCheck
     //全选按钮被选中/取消
     isTrolleyTotalCheck = !isTrolleyTotalCheck
     //遍历并修改所有商品的状态
     trolleyList.forEach(product => {
       trolleyCheckMap[product.id] = isTrolleyTotalCheck
     })
     trolleyAccount = this.totalPrice(trolleyList,trolleyCheckMap)
     this.setData({
       isTrolleyTotalCheck,
       trolleyCheckMap,
       trolleyAccount
     })
  },
  onTapCheckSingle(event){
    let checkId = event.currentTarget.dataset.id
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList
    let trolleyAccount = this.data.trolleyAccount
    let isTrolleyTotalCheck = this.data.isTrolleyTotalCheck
    let numTotalProduct
    let numCheckedProduct = 0
    //单个商品被选中或取消
    trolleyCheckMap[checkId] = !trolleyCheckMap[checkId]
    //判断选中的商品个数是否和总数相等
    numTotalProduct = trolleyList.length
    trolleyCheckMap.forEach(checked => {
      numCheckedProduct = checked ? numCheckedProduct + 1 : numCheckedProduct
    })
    isTrolleyTotalCheck = (numTotalProduct === numCheckedProduct) ? true : false
    trolleyAccount = this.totalPrice(trolleyList,trolleyCheckMap)
    this.setData({
      trolleyCheckMap,
      isTrolleyTotalCheck,
      trolleyAccount
    })
    
  },
  totalPrice(trolleyList,trolleyCheckMap){
    let total = 0
    trolleyList.forEach(product => {
      total = trolleyCheckMap[product.id] ? total + product.price * product.count  : total
    })
    return total
  },
  getTrolley() {
    wx.showLoading({
      title: '正加载购物车信息...',
    })
    qcloud.request({
      url: config.service.getTrolley,
      login:true,
      success: res => {
        setTimeout(() => {
          wx.hideLoading()
        },500)
        let data = res.data
        if(!data.code){
           wx.showToast({
             title: '购物车数据加载成功',
           })
           this.setData({
             trolleyList: data.data
           })
        }else{
          wx.showToast({
            title: '购物车数据加载失败',
          })
        }
      },
      fail: res => {
        setTimeout(()=> {
          wx.hideLoading()
        },500)
        wx.showToast({
          title: '购物车信息加载失败',
        })
      }
    })
  },
  updateTrolley(){
    let trolleyList = this.data.trolleyList
    qcloud.request({
      url: config.service.updateTrolley,
      login: true,
      method: 'POST',
      data: {
        list: trolleyList
      },
      success: res => {
        let data = res.data
        if(!data.code){
          this.setData({
            isTrolleyEdit: false
          })
        }else{
          wx.showToast({
            title: '更新购物车失败',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '更新购物车失败',
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
        console.log(userInfo, 'success')
        this.setData({
          userInfo: userInfo
        })
        this.getTrolley()
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