import {Context} from 'koa'
import * as User from '../models/mysql/User'

export class UserController {
  static async getUserInfo (ctx: Context) {
    const page = ctx.query.page || 1;
    // get data
    ctx.body = {
      code: 200,
      data: await User.getUserById(1)
    }
  }
  static async postInfo (ctx: Context) {
    // const data = ctx.request
    console.log(ctx.request.query)
    ctx.body = {
      code: 200,
      data: {
        action: 'post'
      }
    }
  }
}
