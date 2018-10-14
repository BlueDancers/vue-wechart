import constants from './constants'

let noop = function () {}
let defaultOptions = {
  methods: 'POST',
  success: noop,
  fail: noop,
  loginUrl: null
}

/**
 * @param {*} url 登录地址
 */
function setLoginUrl(url) {
  defaultOptions.loginUrl = url
}
/**
 *
 *
 * @param {*} cb 微信登录 获取code以及encryptData 
 */
function getLoginResult(cb) {
  wx.login({
    success: function (loginRes) {
      wx.getUserInfo({
        success: function (userRes) {
          cb(null, {
            code: loginRes.code,
            encryptedData: userRes.encryptedData,
            iv: userRes.iv,
            userInfo: userRes.userInfo
          })
        },
        fail: function () {
          cb(new Error('获取微信用户信息失败,请检查网络状态', null))
        }
      })
    },
    fail: function () {
      cb(new Error('微信登录失败,请检查网络状态', null))
    }
  })
}
/**
 *
 * @param {*} options // 登录信息
 * @returns
 */
function login(options) {
  options = Object.assign({}, defaultOptions, options)
  if (!options.loginUrl) {
    return options.fail(new Error('登录错误,请通过setLoginUrl()设置登录地址'))
  }
  getLoginResult((err, loginResult) => {
    if (err) {
      options.fail(err)
    }
    // 设置登录请求头
    const header = {
      code: loginResult.code,
      data: loginResult.encryptedData,
      iv: loginResult.iv
    }
    // 请求登录地址
    wx.request({
      url: options.loginUrl,
      method: options.methods,
      header,
      success: function (result) {
        console.log(result,'result');
        const data = result.data
        console.log(data,'result');
        
        // 这里都是代码/环境问题
        console.log(data.code !== 0 || data.data);
        
        if (!data || data.code == 0 || !data.data) {
          return options.fail(new Error(`响应错误,${JSON.stringify(data)}`))
        }
        // 这里都是用户信息问题
        // const res = data.data
        // if (!result || !result.userinfo) {
        //   return options.fail(new Error(`登录失败(${data.error})：${data.message}`))
        // }
        // 登录成功
        // Session.set(res)
        options.success(data.data.openId)
      },
      fail: function () {
        console.error('登录失败，可能是网络错误或者服务器发生异常')
        options.fail(err)
      }
    })
  })
}



export default {
  login,
  setLoginUrl
}
