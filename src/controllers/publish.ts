import { Context } from 'koa'
import { host } from '../../config'
import * as Post from '../models/mysql/Post'
import * as User from '../models/mysql/User'
import { randomMd5 } from "../../lib/md5";


// file upload test
export class PublishController {
  static async edit(ctx: Context) {
    const { uid, pid } = ctx.state
    ctx.body = {
      data: (await Post.editPost(uid, pid))[0]
    }
  }

  static async update(ctx: Context) {
    const { uid, pid } = ctx.state
    const req = ctx.request.body
    await (Post.updatePost(pid, req))
    ctx.body = {
      data: (await Post.editPost(uid, pid))
    }
  }

  static async remove(ctx: Context) {
    const { uid, pid } = ctx.state
    const { query } = ctx.request
    ctx.body = {
      type: 'success',
      msg: '删除成功',
      data: {
        query
      }
    }
  }

  static async publish(ctx: Context) {
    const { uid } = ctx.state
    let req = ctx.request.body
    if (!req.content || !req.mkdown) {
      return ctx.body = {
        type: 'error',
        msg: '缺少内容'
      }
    }
    if (!req.title) {
      return ctx.body = {
        type: 'error',
        msg: '缺少标题'
      }
    }
    if (!req.category) {
      return ctx.body = {
        type: 'error',
        msg: '缺少分类'
      }
    }
    req.hash = randomMd5()
    await Post.post(uid, req)
      .catch((e) => {
        return ctx.body = {
          type: 'error',
          msg: '发布失败'
        }
      })
    await Post.postD(req)
    const { pid } = (await Post.getPidByHash(req.hash))[0]
    ctx.body = {
      type: 'success',
      msg: '发布成功',
      link: `${host}/post/${pid}`
    }
  }

  static async list(ctx: Context) {
    const { uid } = ctx.state
    const { query } = ctx
    const page = Number(query.page) || 1
    const { total } = (await User.postTotal(uid))[0]
    ctx.body = {
      data: {
        posts: (await User.post(uid, page)),
        total,
        page
      }
    }
  }
}
