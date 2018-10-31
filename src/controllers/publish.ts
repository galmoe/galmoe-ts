import { Context } from 'koa'
import { host } from '../../config'
import * as Post from '../models/mysql/Post'
import { randomMd5 } from "../../lib/md5";


// file upload test
export class PublishController {
  static async edit(ctx: Context) {
    const { query } = ctx.request
    ctx.body = {
      type: 'success',
      msg: '修改成功'
    }
  }

  static async publish(ctx: Context) {
    const { uid } = ctx.state
    let req = ctx.request.body
    console.log(req)
    if (!req.content || !req.mkdown || !req.title || !req.category) {
      return ctx.body = {
        type: 'error',
        msg: '缺少字段'
      }
    }
    req.hash = randomMd5()
    await Post.post(uid, req)
    await Post.postD(req)
    const { pid } = (await Post.getPidByHash(req.hash))[0]
    ctx.body =  {
      type: 'success',
      msg: '发布成功',
      link: `${host}/post/${pid}`
    }
  }
}
