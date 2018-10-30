import { Context } from 'koa'
import { host } from '../../config'
import * as Upload from '../models/mysql/Upload'


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
    const req = ctx.request.body
    console.log(req)
    ctx.body =  {
      type: 'success',
      msg: '发布成功'
    }
  }
}
