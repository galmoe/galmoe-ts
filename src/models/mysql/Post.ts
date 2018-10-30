import { dbquery } from '../../db/mysql'
import * as xss from 'xss'

export interface PostType {
  pid?: number;
  title?: string;
  uid?: number;
  date?: string;
  category?: string;
  pv?: number;
  cv?: number;
  lv: number;
  thumb?: string;
  intro?: string;
  hash?: string;
  content?: string;
  mkdown?: string;
  link?: string;
  pwd?: string;
  compress?: string;
  meta?: string;
}

export const post = async (uid: number, post: PostType) => {
  let _sql = `INSERT INTO post (title, uid, date, category, thumb, intro, \`hash\`) VALUES ('${post.title}', ${uid}, NOW(), '${post.category}', '${post.thumb}', '${post.intro}', '${post.hash}')`
  return dbquery(_sql)
}

export const postD = async (post: PostType) => {
  let _sql = `INSERT INTO post_d (\`hash\`, content, mkdown, link, pwd, compress, meta) VALUES ('${post.hash}', '${post.content}', '${post.mkdown}', '${post.link}', '${post.pwd}', '${post.compress}', '${post.meta}')`
  return dbquery(_sql)
}

export const getPost = async (page: number = 1) => {
  let _sql = `SELECT
              post.pid,
              post.title,
              post.uid,
              post.date,
              post.category,
              post.pv,
              post.cv,
              post.lv,
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

export const postTotal = async () => {
  let _sql = `SELECT COUNT(pid) total FROM post`
  return dbquery(_sql)
}
