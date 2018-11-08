import { dbquery } from '../../db/mysql'
import { commentFilter, replyFilter} from "../../../lib/filters";
import * as xss from 'xss'
import { maxFiler, transferContent, escapeChar } from "../../utils/util";

export interface CommentType {
  cid?: number;
  pid?: number;
  uid?: number;
  content?: string;
  date?: string;
  flage?: number;
  lv?: number;
  dv?: number;
  rv?: number;
}

export const getCommentByT = async (pid: number, page:number = 1) => {
  let _sql = `SELECT
              \`comment\`.cid,
              \`comment\`.uid,
              \`comment\`.content,
              \`comment\`.date,
              \`comment\`.lv,
              \`comment\`.dv,
              \`comment\`.rv,
              \`user\`.uname,
              \`user\`.avatar,
              \`comment\`.pid
              FROM
              \`user\`
              INNER JOIN \`comment\` ON \`comment\`.uid = \`user\`.uid
              WHERE
              \`comment\`.pid = ${pid} AND
              \`comment\`.flag = 0
              ORDER BY
              \`comment\`.date DESC
              LIMIT ${(page - 1) * 25}, ${25}`
  return dbquery(_sql)
}


export const getCommentByH = async (pid: number, page:number = 1) => {
  let _sql = `SELECT
              \`comment\`.cid,
              \`comment\`.uid,
              \`comment\`.content,
              \`comment\`.date,
              \`comment\`.lv,
              \`comment\`.dv,
              \`comment\`.rv,
              \`user\`.uname,
              \`user\`.avatar,
              \`comment\`.pid
              FROM
              \`user\`
              INNER JOIN \`comment\` ON \`comment\`.uid = \`user\`.uid
              WHERE
              \`comment\`.pid = ${pid} AND
              \`comment\`.flag = 0
              ORDER BY
              \`comment\`.lv DESC
              LIMIT ${(page - 1) * 25}, ${25}`
  return dbquery(_sql)
}

export const insertOne = async (uid: number, pid: number, content: string) => {
  let _sql = `INSERT INTO \`comment\` (pid, uid, content, date) VALUES (${pid}, ${uid}, '${maxFiler(transferContent(escapeChar(xss(content, commentFilter))), 1000)}', NOW())`
  return dbquery(_sql)
}
