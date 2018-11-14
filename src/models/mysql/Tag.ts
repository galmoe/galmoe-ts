import { dbquery } from "../../db/mysql";
import { escapeChar, maxFiler } from "../../utils/util";

interface TagType {
  pid?: number;
  uid?: number;
  tag: string;
  type?: number;
  date?: string;
}

// 所有tag
export const getTag = async (pid: number) => {
  let _sql = `SELECT
              tag.tag,
              tag.uid,
              tag.type,
              tag.del,
              tag.date
              FROM tag
              INNER JOIN post ON tag.pid = post.pid
              WHERE
              post.pid = ${pid}`
  return dbquery(_sql)
}

// 展示的tag
export const getShowTag = async (pid: number) => {
  let _sql = `SELECT
              tag.tag
              FROM tag
              INNER JOIN post ON tag.pid = post.pid
              WHERE
              post.pid = ${pid} AND
              tag.type = 0`
  return dbquery(_sql)
}

export const add = async (pid: number, uid: number, tag: string) => {
  let _sql = `INSERT INTO tag (pid, uid, tag, date) VALUES(${pid}, ${uid}, '${maxFiler(escapeChar(tag), 20)}', NOW())`
  return dbquery(_sql)
}

export const remove = async (pid: number, uid: number, tag: string) => {
  let _sql = `UPDATE tag SET type = 1, del = ${uid} WHERE pid = ${pid} AND tag = '${tag}'`
  console.log(_sql)
  return dbquery(_sql)
}
