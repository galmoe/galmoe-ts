import { Context } from 'koa'
import * as Img from '../models/mysql/Img'

export const sticker = async (ctx: Context) => {
  const { query } = ctx
  const page = Number(query.page || 1)
  const stickers = (await Img.sticker(page))
  const { total } = (await Img.stickerTotal())[0]
  ctx.body = {
    stickers,
    page,
    pages: Math.ceil(total / 25),
  }
}
