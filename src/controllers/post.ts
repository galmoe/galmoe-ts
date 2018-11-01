import { Context } from 'koa'
import * as Post from '../models/mysql/Post'


export class PostController {
  static async getPost(ctx: Context) {
    const { query } = ctx.request
    console.log(query)
    const page = Number(query.page) || 1
    ctx.body = {
      code: 200,
      data: {
        posts: await Post.getPost(page),
        page,
        total: (await Post.postTotal())[0].total
      }
    }
  }

  static async getPostD(ctx: Context) {
    const pid =  Number(ctx.params.pid) || 1
    let data = (await Post.getPostD(pid))[0]
    let tag = []
    if (data.tag) {
      tag = JSON.parse(data.tag)
    }
    data.tag = [...tag]
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
}
