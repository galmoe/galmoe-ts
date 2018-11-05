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
    query.count = Number(query.count)
    const { total } = (await User.postTotal(query.uid))[0]
    const countRange = [5, 25]
    if (!countRange.includes(query.count)) {
      query.count = 5
    }
    ctx.body = {
      data: {
        posts: (await User.post(query.uid, query.page, query.count)),
        total,
        page: query.page || 1
      }
    }
  }

  static async fav(ctx: Context) {
    const { query } = ctx
    const { total } = (await User.favTotal(query.uid))[0]
    query.count = Number(query.count)
    const countRange = [5, 25]
    if (!countRange.includes(query.count)) {
      query.count = 5
    }
    ctx.body = {
      data: {
        posts: (await User.fav(query.uid, query.page, query.count)),
        total,
        page: query.page || 1
      }
    }
  }

  static async addFav(ctx: Context) {
    const { query } = ctx
    const { total } = (await User.favTotal(query.uid))[0];
    ctx.body = {
      data: {
        posts: (await User.fav(query.uid, query.page)),
        total,
        page: query.page || 1
      }
    }
  }

  static async removeFav(ctx: Context) {
    const { query } = ctx
    const { total } = (await User.favTotal(query.uid))[0];
    ctx.body = {
      data: {
        posts: (await User.fav(query.uid, query.page)),
        total,
        page: query.page || 1
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
    const data = (await User.about(query.uid))[0]
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
