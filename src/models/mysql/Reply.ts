import { dbquery } from '../../db/mysql'
import { commentFilter, replyFilter} from "../../../lib/filters";
import * as xss from 'xss'
import { maxFiler, transferContent, escapeChar } from "../../utils/util";

export interface ReplyType {
  rid?: number;
  cid?: number;
  uid?: number;
  receiver?: number;
  r_name?: string;
  content?: string;
  date?: string;
  parent?: number;
  is_read?: number;
}

export interface ReplyObjType {
  cid: number;
  uid: number;
  receiver: number;
  r_name: string;
  content: string;
  parent?: number | null;
}

export const getReplies = async (cid: number, page:number = 1) => {
  let _sql = `SELECT
              reply.rid,
              reply.parent,
              reply.uid,
              reply.receiver,
              reply.r_name,
              reply.content,
              reply.date,
              \`user\`.uname,
              \`user\`.avatar,
              reply.cid
              FROM
              reply
              INNER JOIN \`user\` ON reply.uid = \`user\`.uid
              WHERE
              reply.cid = ${cid}
              ORDER BY
              reply.date ASC
              LIMIT ${(page - 1) * 20}, 20`
  return dbquery(_sql)
}

export const total = async (cid: number) => {
  let _sql = `SELECT rv FROM comment WHERE cid = ${cid}`
  return dbquery(_sql)
}

export const insertOne = async (replyObj: any) => {
  // let _sql = `INSERT INTO \`comment\` (pid, uid, content, date) VALUES (${pid}, ${uid}, '${maxFiler(transferContent(escapeChar(xss(content, commentFilter))), 1000)}', NOW())`
  // let _sql = `INSERT INTO reply (cid, parent, uid, receiver, r_name, content, date) VALUES (1, null, 1, 1, 'Beats0', 'some content', NOW())`
  let _sql = `INSERT INTO reply SET ?`
  return dbquery(_sql, { ...replyObj , content: maxFiler(transferContent(escapeChar(xss(replyObj.content, commentFilter))), 1000)})
}
