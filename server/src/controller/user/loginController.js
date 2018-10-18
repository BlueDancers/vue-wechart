const axios = require('axios')
const config = require('../../config/config')
const addUser =require('../../models/userModel').addUser
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
// const user = require('../../')

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
  const {
    code
  } = ctx.headers

  const {
    userInfo
  } = ctx.request.body
  await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: config.appid,
        secret: config.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
    .then((result) => {
      ctx.state = {
        code: 1,
        data: result.data
      }
      return result
    })
    .then((result) => {
      let openid = result.data.openid
      addUser(openid, userInfo)
      .then((res) => {
        console.log(res,'数据库返回');
        
      })
      return result
    })
}



module.exports = {
  login
}