const axios = require('axios')
const request = require('request')
const config = require('../../config/config')
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt')


let login = async (ctx) => {
  const {
    code,
    data, // encryptedData
    iv
  } = ctx.headers
  await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: config.appid,
        secret: config.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    .then((result) => {
      var pc = new WXBizDataCrypt(config.appid, result.data.session_key)
      var userInfo = pc.decryptData(data, iv) // 解密
      console.log(userInfo);
      return userInfo
    })
    .then(userInfo => {
      ctx.state = {
        code: 1,
        data: userInfo
      }
    })
}


module.exports = {
  login
}