import {Context} from 'koa'
import {Check} from '../utils/check'
import * as Session from '../models/mysql/Session'
import {UserController} from './user'
import * as User from "../models/mysql/User";
import {md5SUFFIX} from "../../lib/md5";

export class SessionController {
  static async check (ctx: Context, next: any) {
    const cuid = Number(ctx.cookies.get('cuid'))
    const uid = Number(ctx.session.uid)
    if (cuid !== uid) {
      // 删除cookie
      ctx.cookies.set('cuid', '')
      // 删除session
      delete ctx.session.uid
      ctx.throw(400, '未登录')
    } else {
      ctx.state.cuid = cuid
      ctx.state.uid = uid
      return next()
    }
  }

  static async getInfo (ctx: Context) {
    const uid = ctx.state.uid
    ctx.body = {
      session: (await Session.getUserSession(uid))[0]
    }
  }

  static async login(ctx: Context) {
    const req = ctx.request.body
    const {captcha} = ctx.session
    const captchaReg = new RegExp(req.captcha, 'i')
    // captcha
    if (!captchaReg.test(captcha)) {
      return ctx.body = {
        type: 'error',
        msg: '验证码错误'
      }
    }
    // mail
    if (!Check.isEmail(req.email)) {
      return ctx.body = {
        type: 'error',
        msg: '邮箱错误'
      }
    }
    // pwd
    const {uid, pwd} = (await Session.getPwd(req.email))[0]
    if (md5SUFFIX(req.pwd) === pwd) {
      ctx.cookies.set(
        'cuid', uid, {
          maxAge: 15 * 24 * 60 * 60 * 1000,   // 15days
          httpOnly: false
        }
      )
      ctx.session.uid = uid
      ctx.body = {
        session: (await Session.getUserSessionByEmail(req.email))[0]
      }
    } else {
      return ctx.body = {
        type: 'error',
        msg: '密码错误'
      }
    }
  }

  static async logout(ctx: Context) {
    ctx.cookies.set('cuid', '')
    delete ctx.session.uid
    ctx.body = {
      type: 'success',
      msg: '已退出登录'
    }
  }

  static async register(ctx: Context) {
    const req = ctx.request.body
    const {captcha} = ctx.session
    const captchaReg = new RegExp(req.captcha, 'i')
    // captcha
    if (!captchaReg.test(captcha)) {
      return ctx.body = {
        type: 'error',
        msg: '验证码错误'
      }
    }
    // uname
    if (!Check.hasBlank(req.uname) || !Check.max(req.uname, 20)) {
      return ctx.body = {
        type: 'error',
        msg: '昵称错误'
      }
    }
    const {total} = (await User.checkUname(req.uname))[0]
    if (total) {
      return ctx.body = {
        type: 'error',
        msg: '昵称已被注册'
      }
    }
    // mail
    if (!Check.isEmail(req.email)) {
      return ctx.body = {
        type: 'error',
        msg: '邮箱错误'
      }
    }
    const email = (await User.checkUname(req.uname))[0]
    if (email.total) {
      return ctx.body = {
        type: 'error',
        msg: '昵称已被注册'
      }
    }
    // register
    await Session.register(req)
    const {uid} = (await Session.getPwd(req.email))[0]
    ctx.cookies.set(
      'cuid', uid, {
        maxAge: 15 * 24 * 60 * 60 * 1000,   // 15days
        httpOnly: false
      }
    )
    ctx.session.uid = uid
    ctx.body = {
      session: (await Session.getUserSessionByName(req.uname))[0]
    }
  }
}
