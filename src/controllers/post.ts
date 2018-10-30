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
}
