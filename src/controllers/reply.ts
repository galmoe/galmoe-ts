import { Context } from 'koa'
import * as Reply from '../models/mysql/Reply'
import * as _ from 'lodash'

export class ReplyController {
  static async get(ctx: Context) {
    const { query } = ctx
    const cid = Number(query.cid) || 1
    const page = Number(query.page) || 1
    const rv = (await Reply.total(cid))[0]
    if (!rv) {
      return ctx.body = {
        type: 'warning',
        msg: '暂无回复'
      }
    }
    const { total } = rv
    ctx.body = {
      data: {
        replies: await Reply.getReplies(cid, page),
        page,
        total,
        root: cid
      }
    }
  }

  static async insertOne(ctx: Context) {
    const { uid } = ctx.state
    const req = ctx.request.body
    const has = ['cid', 'receiver', 'r_name', 'content', 'parent']
    let replyObj = {
      uid,
      ..._.pick(req, ...has)
    }
    const res = (await Reply.insertOne(replyObj))[3]
    const { rid } = res[0]
    ctx.body = {
      type: 'success',
      rid
    }
  }
}
