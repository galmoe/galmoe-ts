/// <reference path='../../node_modules/koa-body/index.d.ts' />
import { Context } from 'koa'
import * as Post from '../models/mysql/Post'
import * as Tag from '../models/mysql/Tag'
import { escapeChar, maxFiler } from "../utils/util";


export class PostController {
  static async getPost(ctx: Context) {
    const { query } = ctx.request
    const page = Number(query.page) || 1
    const type = maxFiler(escapeChar(query.type), 20)
    console.log('query', query)
    if (type === 'category') {
      const category = maxFiler(escapeChar(query.category), 20)
      ctx.body = {
        code: 200,
        data: {
          posts: await Post.getPostByCategory(category, page),
          page,
          pages: Math.ceil(page / 25),
          total: (await Post.postCategoryTotal(category))[0].total
        }
      }
    } else if (type === 'tag') {
      const tag = maxFiler(escapeChar(query.tag), 20)
      ctx.body = {
        code: 200,
        data: {
          posts: await Post.getPostByTag(tag, page),
          page,
          pages: Math.ceil(page / 25),
          total: (await Post.postTagTotal(tag))[0].total
        }
      }
    } else {
      ctx.body = {
        code: 200,
        data: {
          posts: await Post.getPost(page),
          page,
          pages: Math.ceil(page / 25),
          total: (await Post.postTotal())[0].total
        }
      }
    }
  }

  static async getPostD(ctx: Context) {
    const pid =  Number(ctx.params.pid) || 1
    let data = (await Post.getPostD(pid))[0]
    if (!data) {
      return ctx.body = {
        type: 'error',
        msg: '未找到文章数据'
      }
    }
    data.tag = (await Tag.getTag(pid))
    await Post.addPv(pid)
    ctx.body = {
      code: 200,
      data
    }
  }

  static async download(ctx: Context) {
    const pid =  Number(ctx.params.pid) || 1
    ctx.body = {
      code: 200,
      data: (await Post.download(pid))[0]
    }
  }

  static async addTag(ctx: Context) {
    const pid =  Number(ctx.params.pid) || 1
    const req = ctx.request.body
    if (!req.tag) {
      return ctx.body = {
        type: 'error',
        msg: 'Tag为空'
      }
    }
    const { uid } = ctx.state
    const tags: any[] = (await Tag.getShowTag(pid))
    if (tags.some(t => t.tag === req.tag)) {
      return ctx.body = {
        type: 'warning',
        msg: 'Tag已存在'
      }
    }
    await Tag.add(pid, uid, req.tag)
    ctx.body = {
      type: 'success',
      msg: 'Tag添加成功'
    }
  }

  static async removeTag(ctx: Context) {
    const pid =  Number(ctx.params.pid) || 1
    const { query } = ctx
    const { uid } = ctx.state
    await Tag.remove(pid, uid, query.tag)
    ctx.body = {
      type: 'success',
      msg: 'Tag删除成功'
    }
  }
}
