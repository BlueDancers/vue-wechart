const Router = require('koa-router')
const request = require('request')
const router = new Router()


router.get('/', (ctx) => {
  ctx.body = "路由测试"
})


router.post('/login', (ctx) => {
  console.log(ctx);  
  console.log(ctx.request.body);
  let code = ctx.request.body.code
  let appid = 'wx7716604375333b3b'
  let secret = '0bc6dabe79eca5fbbe15d6576781c537'
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  let result;
  request(url, (err, response, data) => {
    if (err) {
      console.log(err, '错误'); 
    }
    // console.log(response,'response');
    // console.log(data,'传过来的数据');
    result = data
  })
  console.log(result);
  
  ctx.body = {
    data: ctx.request.body,
    session: result.session_key,
    openid:result.openid,
    status: 200
  }
})




module.exports = router
