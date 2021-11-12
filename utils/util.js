const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
/*-----------------------------HTTP工具-Start------------------------------*/
/**
 * POST请求工具
 * @param url 请求路径
 * @param param 请求参数{}
 * @param callback 回调函数
 * @constructor
 */
const HttpClient = {
  Method:{
    get:(url, param, callback) => GET(url, param, callback),
    post:(url, param, callback) => POST(url, param, callback)
  }
}

const GET = (url, param, callback) => {
  wx.request({
    url: url,
    dataType:'json',//返回JSON
    method:'GET',
    header: {'content-type': 'application/json'},// 默认值
    data: param,
    success: callback
  })
}

const POST = (url, param, callback) => {
  wx.request({
    url: url,
    dataType:'json',//返回JSON
    method:'POST',
    header: {'content-type': 'application/json'},// 默认值
    data: param,
    success: callback
  })
}

const Message = {
  Loading: {//加载
    loadingDefault: () => {
      LoadingMessage('加载中...');
    },
    loadingMessage: (message, second) => LoadingMessage(message, second),
    close: () => wx.hideLoading(),
  },
  Alert:{//弹层
    alertSuccess : (message) => AlertSuccess(message),//最多显示7个汉字
    alertError : (message) => AlertError(message),//最多显示7个汉字
    alertDefault : (message) => AlertDefault(message),//最多可显示两行
    alertMessage : (message, icon, second) => AlertMessage(message, icon, second)
  },
  Modal:{
    Default: (message) => ShowModal('提示', message)
  }
}


const LoadingMessage = (message, second) => {
  wx.showLoading({
    title: message,
    mask: true
  });
}

/**
 * 提示成功
 */
const AlertSuccess = (message) => {
  AlertMessage(message, 'success', 2);
}

const AlertError = (message) => {
  AlertMessage(message, 'error', 2);
}

const AlertDefault = (message) => {
  AlertMessage(message, 'none', 2);
}

/**
 * 弹层消息提示框
 * @param message 显示信息
 * @param second 延迟关闭 秒
 * @constructor
 */
const AlertMessage = (message, icon, second) => {
  if(!second) {
    second = 2;
  }
  wx.showToast({
    title: message,
    icon: icon,
    mask: true,
    duration: second * 1000
  })
}

const ShowModal = (title, message) => {
  wx.showModal({
    title: title,
    content: message,
    showCancel:false,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })

}

/*-----------------------------消息工具-END------------------------------*/
/*-----------------------------跳转页面工具-Start------------------------------*/
/**
 * 页面跳转工具
 * @param url 本地页面路径
 * @param param 携带对象参数
 */
const PageGo = {
  jump:(url, param) => {
    wx.navigateTo({
      url: url + DoGetParam(param),
    })
  },
  cacheSearch:(title) => {
    let newHistories = new Set();
    newHistories.add(title);
    let histories = wx.getStorageSync('histories') || [];
    histories.forEach((history) => {
      if(!newHistories.has(history) && newHistories.size < 5) {
        newHistories.add(history);
      }
    });
    histories = Array.from(newHistories);
    wx.setStorageSync('histories', histories);
  },
  getSearchCache:() => {
    return wx.getStorageSync('histories') || [];
  },
  cacheSearch_chooseCity:(title) => {
    let newHistories = new Set();
    newHistories.add(title);
    let histories = wx.getStorageSync('city_histories') || [];
    histories.forEach((history) => {
      if(!newHistories.has(history) && newHistories.size < 5) {
        newHistories.add(history);
      }
    });
    histories = Array.from(newHistories);
    wx.setStorageSync('city_histories', histories);
  },
  getSearchCache_chooseCity:() => {
    return wx.getStorageSync('city_histories') || [];
  },
  switchTo:(url) => {
    wx.switchTab({
      url: url,
      complete() {
        wx.hideLoading();
      },
      fail(res) {
        console.info(res);
      }
    })
  },
}
/*-----------------------------HTTP工具-END------------------------------*/
module.exports = {
  formatTime,
  formatNumber,
  Message,
  PageGo,
  HttpClient,
}
