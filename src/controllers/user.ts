import {Context} from 'koa'
import * as User from '../models/mysql/User'

export class UserController {
  static async getUserInfo(ctx: Context) {
    const { uid } = ctx.params
    ctx.body = {
      code: 200,
      data: {
        user: (await User.getUserById(uid))[0]
      }
    }
  }

  static async postInfo(ctx: Context) {
    // const data = ctx.request
    console.log(ctx.request.query)
    ctx.body = {
      code: 200,
      data: {
        action: 'post'
      }
    }
  }

  static async getErrMessage(ctx: Context) {
    ctx.body = {
      type: 'error',
      msg: 'this is some error message'
    }
  }

  static async checkUname(ctx: Context) {
    const req = ctx.request.body;
    const {total} = (await User.checkUname(req.uname))[0];
    if (total) {
      ctx.body = {
        status: 'failed'
      }
    } else {
      ctx.body = {
        status: 'ok'
      }
    }
  }

  static async checkEmail(ctx: Context) {
    const req = ctx.request.body;
    const {total} = (await User.checkEmail(req.email))[0];
    if (total) {
      ctx.body = {
        status: 'failed'
      }
    } else {
      ctx.body = {
        status: 'ok'
      }
    }
  }
}
