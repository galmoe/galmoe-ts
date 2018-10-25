import { Context } from 'koa'
import { Check } from '../utils/check'
import * as Session from '../models/mysql/Session'
import { UserController } from './user'
import * as User from "../models/mysql/User";

export class SessionController {
  static async login (ctx: Context) {
    //
  }
  static async logout (ctx: Context) {
    //
  }
  static async register (ctx: Context) {
    const req = ctx.request.body
    console.log(req)
    console.log(ctx.session.captcha)
    const {captcha} = ctx.request.body
    const {_captcha} = ctx.session
    const captchaReg = new RegExp(captcha, 'i')
    // captcha
    if (!captchaReg.test(_captcha)) {
      ctx.body = {
        type: 'error',
        msg: '验证码错误'
      }
    }
    // uname
    if (!Check.hasBlank(req.uname) || !Check.max(req.uname, 20)) {
      ctx.body = {
        type: 'error',
        msg: '昵称错误'
      }
    }
    const {total} = (await User.checkUname(req.uname))[0]
    if (total) {
      ctx.body = {
        type: 'error',
        msg: '昵称已被注册'
      }
    }
    // mail
    if (!Check.isEmail(req.email)) {
      ctx.body = {
        type: 'error',
        msg: '邮箱错误'
      }
    }
    const email = (await User.checkUname(req.uname))[0]
    if (email.total) {
      ctx.body = {
        type: 'error',
        msg: '昵称已被注册'
      }
    }
    await Session.register(req)
    ctx.body = {
      session: (await Session.getUserSessionByName(req.uname))[0]
    }
  }
}
