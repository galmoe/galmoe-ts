import { Context } from 'koa'
import * as Post from '../models/mysql/Post'

export class PostController {
  static async getPost(ctx: Context) {
    const req = ctx.request.body
    console.log(ctx.request)
    const page = req.page || 1
    ctx.body = {
      code: 200,
      data: {
        posts: await Post.getPost(page),
        page,
        total: (await Post.postTotal())[0].total
        // user: (await User.getUserById(uid))[0]
      }
    }
  }
}
