const Koa = require('koa2')
const response = require('koa-bodyparser')
const router = require('./src/routes/routers')
const middle = require('./src/middlewares/response')
const app = new Koa()
app.use(middle)
app.use(response())
app.listen(3000, () => {
  console.log('[koa] is start');
})

app.use(router.routes())