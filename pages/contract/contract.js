// pages/contract/contract.js
const app = getApp()
const HttpClient = require('../../utils/util.js').HttpClient;
const HttpConfig = require('../../utils/config.js').HttpConfig;
//html解析模块
let htmlParse = require('../../components/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    HttpClient.Method.get(HttpConfig.controllerUrl.getControlle,{ordersn:app.globalData.ordersn},function(res){
      if(res.data.flag){
        that.setData({ruleInfo:res.data.data})
        htmlParse.wxParse('commodityDetails', 'html', that.data.ruleInfo, that, 5);
      }else{
        console.log('没有订单id')
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

  },
  centerFun(){
    wx.redirectTo({
      url: '/pages/payment/payment'
    })
  },
  backUp(){
    wx.redirectTo({
      url: '/pages/indexs/indexs'
    })
  }
})