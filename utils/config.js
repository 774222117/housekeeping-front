/**
 * 项目配置
 */
const host = "https://housekeeping.ckldzsw.com";
// const host = "http://localhost:8080";
var oss = "https://housekeeping.ckldzsw.com"
const HttpConfig = {
  PayOrder:{
    payOrders:`${host}/app/order/payOrder`,
    orderStatus:`${host}/app/order/orderStatus`,
  },
  WeChatPhone:{
    getWeChatPhone:`${host}/app/people/getWeChatPhone`
  },
  orderInfoUrl:{
    getOrder:`${host}/app/order/getOrder`
  },
  controllerUrl:{
    getControlle:`${host}/app/contract/getTemplate`
  },
  RegisterUrl:{
    InfoUrl:`${host}/app/people/register`,//注册
  },
  LoginUrl:{
    InfoUrl:`${host}/app/people/loginIn`,//登录
  }
}
/**
 * 缓存key
 */
const CacheKey = {
  userInfo : 'userInfo'
}
module.exports = { HttpConfig, CacheKey }
