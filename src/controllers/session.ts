import { Context } from 'koa'
import { Check } from '../utils/check'
import * as Session from '../models/mysql/Session'
import * as User from "../models/mysql/User";
import { postAuthor } from "../models/mysql/Post";
import { md5SUFFIX } from "../../lib/md5";


export class SessionController {
  static async check(ctx: Context, next: any) {
    const cuid = Number(ctx.cookies.get('cuid'))
    const uid = Number(ctx.session.uid)
    console.log('cuid: ', cuid, 'uid: ', uid)
    if (cuid !== uid) {
      // 删除cookie
      ctx.cookies.set('cuid', '')
      // 删除session
      delete ctx.session.uid
      return ctx.body =  {
        type: 'error',
        msg: '未登录'
      }
    } else {
      ctx.state.cuid = cuid
      ctx.state.uid = uid
      return next()
    }
  }

  static async checkAdmin(ctx: Context, next: any) {
    const cuid = Number(ctx.cookies.get('cuid'))
    const uid = Number(ctx.session.uid)
    console.log('cuid: ', cuid, 'uid: ', uid)
    if (cuid !== uid || cuid !== 1) {
      // 删除cookie
      ctx.cookies.set('cuid', '')
      // 删除session
      delete ctx.session.uid
      return ctx.body =  {
        type: 'error',
        msg: '非管理员用户'
      }
    } else {
      ctx.state.cuid = cuid
      ctx.state.uid = uid
      return next()
    }
  }

  static async checkCaptcha(ctx: Context, next: any) {
    const req = ctx.request.body
    const { captcha } = ctx.session
    if (!captcha || !req.captcha) {
      return ctx.body = {
        type: 'error',
        msg: '验证码错误'
      }
    }
    const captchaReg = new RegExp(req.captcha, 'i')
    if (!captchaReg.test(captcha)) {
      return ctx.body = {
        type: 'error',
        msg: '验证码错误'
      }
    } else {
      // 验证码通过, 删除captcha
      delete ctx.session.captcha
      return next()
    }
  }

  static async isAuthorByPost(ctx: Context, next: any) {
    const { uid } = ctx.state
    const pid = Number(ctx.request.body.pid)
    const autorId = (await postAuthor(pid))[0].uid
    if (uid !== autorId) {
      return ctx.body =  {
        type: 'error',
        msg: '身份错误'
      }
    } else {
      ctx.state.pid = pid
      return next()
    }
  }

  static async isAuthorByQuery(ctx: Context, next: any) {
    const { uid } = ctx.state
    const pid = Number(ctx.query.pid)
    const autorId = (await postAuthor(pid))[0].uid
    if (uid !== autorId) {
      return ctx.body =  {
        type: 'error',
        msg: '身份错误'
      }
    } else {
      ctx.state.pid = pid
      return next()
    }
  }

  static async getInfo(ctx: Context) {
    const uid = ctx.state.uid
    ctx.body = {
      session: (await Session.getUserSession(uid))[0]
    }
  }

  static async private(ctx: Context) {
    const uid = ctx.state.uid
    ctx.body = {
      session: (await Session.privateInfo(uid))[0]
    }
  }

  static async login(ctx: Context) {
    const req = ctx.request.body
    // mail
    if (!Check.isEmail(req.email)) {
      return ctx.body = {
        type: 'error',
        msg: '邮箱错误'
      }
    }
    // pwd
    const res = (await Session.getPwd(req.email))[0]
    if (!res) {
      return ctx.body = {
        type: 'error',
        msg: '邮箱未注册'
      }
    }
    const { uid } = res
    const { pwd } = (await Session.getPwdById(uid))[0]
    if (md5SUFFIX(req.pwd) === pwd) {
      ctx.cookies.set(
        'cuid', uid, {
          maxAge: 15 * 24 * 60 * 60 * 1000,   // 15days
          httpOnly: false
        }
      )
      ctx.session.uid = uid
      ctx.body = {
        type: 'success',
        msg: '登录成功',
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
    // uname
    if (Check.hasBlank(req.uname)) {
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
      type: 'success',
      msg: '登录成功',
      session: (await Session.getUserSessionByEmail(req.email))[0]
    }
  }

  static async update(ctx: Context) {
    const req = ctx.request.body
    const { uid } = ctx.state
    // uname
    if (Check.hasBlank(req.uname)) {
      return ctx.body = {
        type: 'error',
        msg: '昵称错误'
      }
    }
    // mail
    if (!Check.isEmail(req.email)) {
      return ctx.body = {
        type: 'error',
        msg: '邮箱错误'
      }
    }
    await Session.update(uid, req)
      .then(() => {
        return ctx.body = {
          type: 'success',
          msg: '修改成功'
        }
      })
      .catch((e) => {
        ctx.body = {
          type: 'error',
          msg: '昵称或邮箱已被注册'
        }
      })
  }

  static async safety(ctx: Context) {
    const req = ctx.request.body
    const { uid } = ctx.state
    const { pwd } = (await Session.getPwdById(uid))[0]
    if (md5SUFFIX(req.pwdOr) !== pwd) {
      return ctx.body = {
        type: 'error',
        msg: '密码错误'
      }
    }
    await Session.safety(uid, req.pwd)
    ctx.body = {
      type: 'success',
      msg: '密码修改成功'
    }
  }
}
