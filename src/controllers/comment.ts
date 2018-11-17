/// <reference path='../../node_modules/koa-body/index.d.ts' />
import { Context } from 'koa'
import * as Comment from '../models/mysql/Comment'

export class CommentController {
  static async getComment(ctx: Context) {
    const { pid } = ctx.params
    const { query } = ctx
    const { cv, ct } = (await Comment.total(pid))[0]
    const page = Number(query.page) || 1
    if (query.sort === 'h' ) {
      ctx.body = {
        data: {
          lists: (await Comment.getCommentByH(pid, page)),
          page,
          pages: Math.ceil(cv / 25),
          cv,
          ct
        }
      }
    } else {
      ctx.body = {
        data: {
          lists: (await Comment.getCommentByT(pid, page)),
          page,
          pages: Math.ceil(cv / 25),
          cv,
          ct
        }
      }
    }
  }

  static async insertOne(ctx: Context) {
    const { uid } = ctx.state
    const { pid } = ctx.params
    let { content } = ctx.request.body
    const res = (await Comment.insertOne(uid, pid, content))[3]
    const { cid } = res[0]
    ctx.body = {
      type: 'success',
      cid
    }
  }
}
