// pages/indexs.js
const app = getApp()
const HttpClient = require('../../utils/util.js').HttpClient;
const HttpConfig = require('../../utils/config.js').HttpConfig;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:app.globalData.orderInfo,
    ordersn:app.globalData.ordersn,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let ordersn = options.ordersn;
    if(!!ordersn){
      HttpClient.Method.get(HttpConfig.orderInfoUrl.getOrder,{ordersn:ordersn},function(res){
        if(res.data.flag){
          app.globalData.orderInfo = res.data.data
          that.setData({orderInfo : app.globalData.orderInfo})
          that.queryOrder()
        }else{
          wx.navigateTo({
            url: '/pages/noOrder/noOrder'
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/noOrder/noOrder'
      })
    }
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

  onShareAppMessage() {
    let ordersn = app.globalData.ordersn;
    return {
      path: '/pages/index/index?ordersn=' + ordersn,
      imageUrl:'/pages/images/share.png',
    }
  },
  queryOrder(){
    let that = this
    HttpClient.Method.get(HttpConfig.PayOrder.orderStatus,{
      ordersn:app.globalData.ordersn},function(res){
        if(res.data.flag){
           wx.redirectTo({
              url: '/pages/serveEffect/serveEffect'
           })
        }
    })
  },

  centerFun(){
    wx.redirectTo({
      url: '/pages/contract/contract'
    })
  }
})
