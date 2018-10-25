import {Context} from 'koa'
import * as User from '../models/mysql/User'

export class UserController {
  static async getUserInfo(ctx: Context) {
    const uid = ctx.params.uid
    const page = ctx.query.page || 1;
    const user = {
      uid: 1,
      uname: 'Beats0',
      avatar: 'https://avatars0.githubusercontent.com/u/29087203?s=460&v=4',
      background: 'https://ws1.sinaimg.cn/large/006nOlwNly1fwfzijcndvj315o0ogtgr.jpg',
      sign: 'Twitter、Github、Steam @Beats0 写代码，吃吃吃'
    }
    // get data
    ctx.body = {
      code: 200,
      // data: await User.getUserById(1)
      data: {
        user
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

  static async getMessage(ctx: Context) {
    ctx.body = {
      type: 'success',
      msg: 'this is some success message'
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
