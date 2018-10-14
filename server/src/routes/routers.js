const Router = require('koa-router')
const userController = require('../controller/user/loginController')
const router = new Router()


router.get('/', (ctx) => {
  ctx.body = "路由测试"
})


router.post('/login', userController.login)

module.exports = router