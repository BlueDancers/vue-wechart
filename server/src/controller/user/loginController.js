const axios = require('axios')
const config = require('../../config/config')
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt')


// let login = async (ctx) => {
//   const {
//     code,
//     data, // encryptedData
//     iv
//   } = ctx.headers
//   await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
//       params: {
//         appid: config.appid,
//         secret: config.secret,
//         js_code: code,
//         grant_type: 'authorization_code'
//       }
//     })
//     .then((result) => {
//       var pc = new WXBizDataCrypt(config.appid, result.data.session_key)
//       var userInfo = pc.decryptData(data, iv)
//       console.log(userInfo);

//       return userInfo
//     })
//     .then(userInfo => {
//       ctx.state = {
//         code: 1,
//         data: userInfo
//       }
//     })
// }

let login = async (ctx) => {
  console.log(ctx.headers);
  
  const {
    code
  } = ctx.headers

  const {
    userInfo
  } = ctx.request.body
  console.log(userInfo);
  
  await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: config.appid,
        secret: config.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    .then((result) => {
<<<<<<< HEAD
      var pc = new WXBizDataCrypt(config.appid, result.data.session_key)
      var userInfo = pc.decryptData(data, iv) // 解密
      console.log(userInfo);
      return userInfo
    })
    .then(userInfo => {
=======
      console.log(result.data);
>>>>>>> fbbec6799836e6bef7c85b2f5daf236e7bbf96b1
      ctx.state = {
        code: 1,
        data: result.data
      }
    })
}



module.exports = {
  login
}