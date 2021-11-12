// pages/payment/payment.js
const app = getApp()
const HttpClient = require('../../utils/util.js').HttpClient;
const HttpConfig = require('../../utils/config.js').HttpConfig;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:app.globalData.orderInfo,
    sessionKey:'',
    openId:'',
    userData: {},
    encryptedData: "",
    iv: "",
    orderPaymentNum:0,
    orderIsTrue:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({orderInfo:app.globalData.orderInfo})
    that.queryOrder()
  },
  paymentClick(){
    var that = this
      wx.showLoading({
        title: '订单支付中',
        icon:'loading',
        mask: true,
        duration:5000
      })
      wx.login({
      success (res) {
        if (res.code) {
          HttpClient.Method.get(HttpConfig.LoginUrl.InfoUrl,{code:res.code},function(res){
            if(res.data.code == 2){
              that.setData({
                openId:res.data.data.openId,
                sessionKey:res.data.data.session_key
              })
              app.setUserInfo(res.data.data)
              that.runPayOrder()
            }else if(res.data.code == 0){
              console.log('异常信息！！！')
              return
            }else{
              that.setData({
                openId:res.data.data.openid,
                sessionKey:res.data.data.session_key,
              })
              wx.getUserInfo({
                success: function (res) {
                  that.setData({
                    iv:res.iv,
                    encryptedData:res.encryptedData,
                    userData:res.userInfo,
                  })

                  // 调用注册接口
                  HttpClient.Method.post(HttpConfig.RegisterUrl.InfoUrl,{
                    openId:that.data.openId+'',
                    nickName:that.data.userData.nickName+'',
                    icon:that.data.userData.avatarUrl+''
                    },function(res){
                      if(res.data.flag){
                        app.setUserInfo(res.data.data)
                        that.runPayOrder()
                      }
                    })
                }})
            }
          })
        }else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  runPayOrder(){
    let that = this;
    HttpClient.Method.get(HttpConfig.PayOrder.payOrders,{
      ordersn:app.globalData.ordersn,
      openId:that.data.openId},function(res){
        if(res.data.flag){
          that.wxOrderPayment(res)
        }else{
          wx.showLoading({
            title: '调用支付失败',
            icon:'loading',
            mask: true,
            duration:2000
          })
        }

    })
  },
  queryOrder(){
    let that = this
    HttpClient.Method.get(HttpConfig.PayOrder.orderStatus,{
      ordersn:app.globalData.ordersn},function(res){
        if(res.data.flag){
           that.setData({orderIsTrue:res.data.flag})
           wx.showLoading({
            title: res.data.message,
            icon:'loading',
            mask: true,
            duration:5000
          })
           wx.redirectTo({
              url: '/pages/serveEffect/serveEffect'
           })
        }
    })
  },
  // 调用微信支付
  wxOrderPayment(res){
    let data = res.data.data
    let that = this
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package1,
      signType: data.signType,
      paySign: data.paySign,
      success (res) {},
      fail (res) {},
      complete(res) {
        setTimeout(function(){
          let timers = setInterval(function(){
            if(that.data.orderIsTrue){
              clearInterval(timers)
            }else{
              that.queryOrder()
              // 如果100次还没有付款就不查询订单了
              if(that.data.orderPaymentNum >=100){
                clearInterval(timers)
              }else{
                that.setData({
                  orderPaymentNum:++that.data.orderPaymentNum
                })
              }
            }
          },1000)
        },1000)
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
  backUp(){
    wx.redirectTo({
      url: '/pages/contract/contract'
    })
  }
})
