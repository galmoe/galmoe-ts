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

  // user page
  static async post(ctx: Context) {
    const { query } = ctx
    const uid  = Number(query.uid) || 1
    const page = Number(query.page) || 1
    let count = Number(query.count) || 1
    const { total } = (await User.postTotal(uid))[0]
    const countRange = [5, 25]
    if (!countRange.includes(count)) {
      count = 5
    }
    ctx.body = {
      data: {
        posts: (await User.post(uid, page, count)),
        total,
        page
      }
    }
  }

  static async fav(ctx: Context) {
    const { query } = ctx
    const uid  = Number(query.uid) || 1
    const page = Number(query.page) || 1
    let count = Number(query.count) || 1
    const { total } = (await User.favTotal(uid))[0]
    const countRange = [5, 25]
    if (!countRange.includes(count)) {
      count = 5
    }
    ctx.body = {
      data: {
        posts: (await User.fav(uid, page, count)),
        total,
        page
      }
    }
  }

  static async addFav(ctx: Context) {
    const { query } = ctx
    const uid  = Number(query.uid) || 1
    const page = Number(query.page) || 1
    const { total } = (await User.favTotal(uid))[0];
    ctx.body = {
      data: {
        posts: (await User.fav(uid, page)),
        total,
        page
      }
    }
  }

  static async removeFav(ctx: Context) {
    const { query } = ctx
    const uid  = Number(query.uid) || 1
    const page = Number(query.page) || 1
    const { total } = (await User.favTotal(uid))[0];
    ctx.body = {
      data: {
        posts: (await User.fav(uid, page)),
        total,
        page
      }
    }
  }

  static async comment(ctx: Context) {
    const req = ctx.request.body;
    const { total } = (await User.checkEmail(req.email))[0];
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

  static async about(ctx: Context) {
    const { query } = ctx
    const uid  = Number(query.uid) || 1
    const data = (await User.about(uid))[0]
    if (!data) {
      return ctx.body = {
        data: {
          intro: '',
          links: '',
          register: ''
        }
      }
    }
    if (data.links) {
      data.links = JSON.parse(data.links)
    }
    ctx.body = {
      data
    }
  }

  static async UpdateAbout(ctx: Context) {
    const { uid } = ctx.state
    const req = ctx.request.body
    await User.upDateAbout(uid, req.intro, JSON.stringify(req.links))
      .then(() => {
        return ctx.body = {
          type: 'success',
          msg: '修改成功'
        }
      })
      .catch((e) => {
        ctx.body = {
          type: 'error',
          msg: '修改失败'
        }
      })
  }

  static async following(ctx: Context) {
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

  static async follower(ctx: Context) {
    const req = ctx.request.body;
    const { total } = (await User.checkEmail(req.email))[0];
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
