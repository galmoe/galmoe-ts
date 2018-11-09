import { Context } from 'koa'
import * as Comment from '../models/mysql/Comment'

export class CommentController {
  static async getComment(ctx: Context) {
    const { pid } = ctx.params
    const { query } = ctx
    const total = (await Comment.total(pid))[0].cv
    const page = Number(query.page) || 1
    if (query.sort === 'h' ) {
      ctx.body = {
        data: {
          lists: (await Comment.getCommentByH(pid, page)),
          page,
          total
        }
      }
    } else {
      ctx.body = {
        data: {
          lists: (await Comment.getCommentByT(pid, page)),
          page,
          total
        }
      }
    }
  }

  static async insertOne(ctx: Context) {
    const { uid } = ctx.state
    const { pid } = ctx.params
    let { content } = ctx.request.body
    await Comment.insertOne(uid, pid, content)
    ctx.body = {
      type: 'success',
      msg: '添加评论成功'
    }
  }
}
