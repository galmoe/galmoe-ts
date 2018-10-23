import * as path from 'path'
import * as Koa from 'koa'
import {serve} from '../config'
import * as router from './routes'
import * as bodyParser from 'koa-bodyparser';
const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const cors = require('koa2-cors')
import * as koaBody from 'koa-body'

const app = new Koa();

app
  .use(cors({
  origin: function () {
    // if (ctx.url === '/test') {
    //   return "*"; // test开放
    // }
    return serve.cors
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 52428800
  }
}))
app.use(bodyParser({
  formLimit: '2mb'
}
))

// 为编译后的public
app.use(staticCache(path.join(__dirname, '../public'), { dynamic: true }, {
  maxAge: serve.maxAge,
  gzip: true
}))

app.use(async (ctx, next) => {
  const start = Date.now()
  try {
    await next()
    let ms = Date.now() - start
    // 记录所有日志
    // if (ctx.status) {
    //   logger.logResponse(ctx, ms)
    console.log(`${ctx.request.method} ${ctx.url} ${ms}`)
    // }
  } catch (err) {
    // 记录错误日志
    console.error(err)
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: err.message
    }
    // console.error(`${ctx.request.method} ${ctx.url} ${errorms}`)
    // logger.logError(ctx, error, errorms)
  }
})

app.use(router.routes());

app.listen(serve.port);

console.log(`Server running on port ${serve.port}`);
