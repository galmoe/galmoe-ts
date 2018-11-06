import { randomMd5 } from "../../../lib/md5";
import { dbquery } from '../../db/mysql'
import { contentFilter, introFilter } from "../../../lib/filters";
import { maxFiler, transferContent, escapeChar } from "../../utils/util";
import * as xss from 'xss'

export interface PostType {
  pid?: number;
  title?: string;
  sub_title?: string;
  hash?: string;
  uid?: number;
  date?: string;
  category?: string;
  pv?: number;
  cv?: number;
  lv?: number;
  fv?: number;
  thumb?: string;
  content?: string;
  intro?: string;
  download?:object;
}

export interface DownloadType {
  link?: string;
  pwd?: string;
  compress?: string;
  meta?: string;
}

export interface PostDType {
  hash?: string;
  content?: string;
  mkdown?: string;
  download: DownloadType;
  dv?: number;
}

export interface UpdateType extends PostType, PostDType {
  download: DownloadType;
}

export const post = async (uid: number, post: PostType) => {
  let _sql = `INSERT INTO post (title, sub_title, uid, date, category, thumb, intro, download, \`hash\`) VALUES
  ('${escapeChar(post.title)}', '${escapeChar(post.sub_title)}', ${uid}, NOW(), '${post.category}', '${post.thumb}', '${maxFiler(transferContent(escapeChar(xss(post.content, introFilter))), 200)}',
  ${(post.download ? 1: 0)}, '${post.hash}')`
  return dbquery(_sql)
  // let _sql = `INSERT INTO post SET ?`
  // return dbquery(_sql, { uid, ...post, date: 'NOW()', intro: maxFiler(transferContent(xss(post.content, introFilter)), 200), download: (post.download ? 1: 0)})
}

export const postAuthor = async (pid: number) => {
  let _sql = `SELECT uid FROM post WHERE pid = ${pid}`
  return dbquery(_sql)
}

export const editPost = async (uid: number, pid: number) => {
  let _sql = `SELECT
              post.title,
              post.sub_title,
              post.category,
              post.thumb,
              post_d.mkdown,
              post_d.link,
              post_d.pwd,
              post_d.compress,
              post_d.meta
              FROM post
              INNER JOIN post_d ON post_d.\`hash\` = post.\`hash\`
              WHERE
              post.pid = ${pid} AND
              post.uid = ${uid}`
  return dbquery(_sql)
}

export const updatePost = async (pid: number, post: UpdateType) => {
  let _sql = `UPDATE post p
              JOIN post_d d ON p.\`hash\` = d.\`hash\`
              SET p.title = ?, p.sub_title=?, p.date=NOW(), p.category=?, p.thumb=?, p.intro=?,p.download=?,
              d.content=?, d.mkdown=?, d.link=?,d.pwd=?,d.compress=?, d.meta=?
              WHERE p.pid = ${pid}`
  return dbquery(_sql, [post.title, post.sub_title, post.category, post.thumb, maxFiler(transferContent(escapeChar(xss(post.content, introFilter))), 200), (post.download ? 1 : 0), transferContent(xss(post.content, contentFilter)), post.mkdown, post.download.link, post.download.pwd, post.download.compress, post.download.meta])
}

export const postD = async (post: PostDType) => {
  let _sql = `INSERT INTO post_d (\`hash\`, content, mkdown, link, pwd, compress, meta) VALUES ('${post.hash}',
  '${transferContent(escapeChar(xss(post.content, contentFilter)))}', '${escapeChar(post.mkdown)}', '${post.download.link}', '${post.download.pwd}', '${post.download.compress}', '${escapeChar(post.download.meta)}')`
  return dbquery(_sql)
  // let _sql = `INSERT INTO post_d SET ?`
  // return dbquery(_sql, { hash: post.hash, content: transferContent(xss(post.content, contentFilter)), mkdown: post.mkdown, link: post.download.link, pwd: post.download.pwd, compress: post.download.compress, meta: post.download.meta})
}

export const getPost = async (page: number = 1) => {
  let _sql = `SELECT
              post.pid,
              post.title,
              post.sub_title,
              post.uid,
              post.date,
              post.category,
              post.pv,
              post.cv,
              post.lv,
              post.fv,
              post.thumb,
              post.intro,
              post.\`hash\`,
              \`user\`.uname,
              \`user\`.avatar
              FROM
              post
              INNER JOIN \`user\` ON post.uid = \`user\`.uid
              ORDER BY
              post.date DESC
              LIMIT ${(page - 1) * 25}, 25`
  return dbquery(_sql)
}

export const getPidByHash = async (hash: string) => {
  let _sql = `SELECT pid FROM post WHERE \`hash\` = '${hash}'`
  return dbquery(_sql)
}

export const postTotal = async () => {
  let _sql = `SELECT COUNT(pid) total FROM post`
  return dbquery(_sql)
}

export const getPostD = async (pid: number) => {
  let _sql = `SELECT
              post.pid,
              post.title,
              post.sub_title,
              post.date,
              post.category,
              post.pv,
              post.lv,
              post.fv,
              post.cv,
              post.thumb,
              post.download,
              post_d.content,
              post_d.meta,
              \`user\`.uid,
              \`user\`.uname,
              \`user\`.avatar
              FROM
              post_d
              INNER JOIN post ON post_d.\`hash\` = post.\`hash\`
              INNER JOIN \`user\` ON post.uid = \`user\`.uid
              WHERE
              post.pid = ${pid}`
  return dbquery(_sql)
}

export const download = async (pid: number) => {
  let _sql = `SELECT
              post_d.link,
              post_d.pwd,
              post_d.compress
              FROM
              post_d
              INNER JOIN post ON post_d.\`hash\` = post.\`hash\`
              WHERE
              post.pid = ${pid}`
  return dbquery(_sql)
}

export const addPv = async (pid: number) => {
  let _sql = `UPDATE post SET pv = pv + 1 WHERE pid = ${pid}`
  return dbquery(_sql)
}
