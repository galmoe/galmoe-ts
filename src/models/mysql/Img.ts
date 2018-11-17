import { dbquery } from "../../db/mysql";
import { escapeChar, maxFiler } from "../../utils/util";

export const sticker = async (page: number = 1) => {
  const _sql = `SELECT src FROM sticker LIMIT ${(page - 1) * 25}, 25`
  return dbquery(_sql)
}

export const stickerTotal = async () => {
  const _sql = `SELECT COUNT('scr') total FROM sticker`
  return dbquery(_sql)
}
