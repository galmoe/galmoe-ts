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
  let _sql = `SELECT rv total FROM comment WHERE cid = ${cid}`
  return dbquery(_sql)
}

export const insertOne = async (replyObj: any) => {
  let _sql = `
  INSERT INTO reply (cid, parent, uid, receiver, r_name, content, date) VALUES (${replyObj.cid}, ${replyObj.parent}, ${replyObj.uid}, ${replyObj.receiver}, '${escapeChar(replyObj.r_name)}', '${maxFiler(transferContent(escapeChar(xss(replyObj.content, replyFilter))), 1000)}', NOW());
  UPDATE \`comment\` SET rv = rv + 1, ct = ct + 1 WHERE cid = ${replyObj.cid};
  UPDATE post p
      JOIN comment c ON p.pid = c.pid
  SET p.cv = p.cv + 1
  WHERE c.cid = ${replyObj.cid};
  SELECT MAX(rid) rid FROM reply;`
  return dbquery(_sql)
}
