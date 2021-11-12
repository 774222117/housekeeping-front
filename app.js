// app.js
App({
  onLaunch(opt) {

  },
  onShow(opt) {
    console.log(opt)
    this.globalData.ordersn = opt.query.ordersn
  },
  setUserInfo: function (userInfo) {
    this.globalData.userInfo = userInfo;
  },
  globalData: {
    userInfo: null,
    orderInfo:null,
    ordersn:null,
  }
})
