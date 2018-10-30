import * as path from 'path'
import * as Koa from 'koa'
import { serve, sessionConfig, uploadDir } from '../config'
import * as router from './routes'
import * as koaBody from 'koa-body'
import * as bodyParser from 'koa-bodyparser'
const session = require('koa-session2')
const staticCache = require('koa-static-cache')
const cors = require('koa2-cors')

const app = new Koa();

// cors
app.use(cors({
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

// save session to redis
app.keys = Array.from({length: 50}, (v, i) => String(i + Math.floor((Math.random() * 100) + 1)))
app.use(session(sessionConfig))

// let filePath = ''
// let fileName = ''

let fileInfo = {
  dir: '',
  fname: '',
  type: ''
}

// file upload
app.use(koaBody({
  multipart: true,
  formidable: {
    hash: 'md5',
    uploadDir: uploadDir(),
    maxFileSize: 3 * 1024 * 1024, // 3m,
    keepExtensions: true,
    onFileBegin: function (name, file) {
      fileInfo.dir = path.dirname(file.path)
      fileInfo.fname = path.basename(file.path)
      fileInfo.type = file.type
    }
  }
}))

// body parser
app.use(bodyParser({
    formLimit: '2mb'
  }
))

// static 为编译后的public
app.use(staticCache(path.join(__dirname, '../public'), {dynamic: true}, {
  maxAge: serve.maxAge,
  gzip: true
}))

// log
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

export function fileInfoF() {
  return fileInfo
}

console.log(`Server running on port ${serve.port}`);
