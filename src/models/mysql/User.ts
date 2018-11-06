import { dbquery } from '../../db/mysql'

export interface UserType {
  uid?:number;
  uname?:string;
  pwd?:string;
  email?:string;
  avatar?:string;
  register?:string;
  sign?: string
}

export const getUserByName = async (uname: string) => {
  let _sql = `SELECT * FROM \`user\` WHERE uname = '${uname}'`
  return dbquery(_sql)
}

export const getUserById = async (uid: number) => {
  let _sql = `SELECT uid, uname, avatar, background, sign, following, follower FROM \`user\` WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const checkUname = async (uname: string) => {
  let _sql = `SELECT COUNT(uname) total FROM \`user\` WHERE uname = '${uname}'`
  return dbquery(_sql)
}

export const checkEmail = async (email: string) => {
  let _sql = `SELECT COUNT(email) total FROM \`user\` WHERE email = '${email}'`
  return dbquery(_sql)
}

// user page
export const post = async (uid: number, page:number = 1, count: number = 25) => {
  let _sql = `SELECT
              pid, uid, title, date, pv, lv, fv, thumb
              FROM post WHERE
              uid = ${uid}
              ORDER BY post.date DESC
              LIMIT ${(page - 1) * count}, ${count}`
  return dbquery(_sql)
}

export const postTotal = async (uid: number) => {
  let _sql = `SELECT COUNT(pid) total FROM post WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const fav = async (uid: number, page:number = 1, count: number = 25) => {
  let _sql = `SELECT
                fav.uid,
                fav.pid,
                post.title,
                post.date,
                post.pv,
                post.lv,
                post.fv,
                post.thumb
                FROM
                fav
                INNER JOIN post ON fav.pid = post.pid
                WHERE
                fav.uid = ${uid}
                ORDER BY post.date DESC
                LIMIT ${(page - 1) * count}, ${count}`
  return dbquery(_sql)
}

export const favTotal = async (uid: number) => {
  let _sql = `SELECT COUNT(pid) total FROM fav WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const about = async (uid: number) => {
  let _sql = `SELECT intro, register, links FROM \`user\` WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const upDateAbout = async (uid: number, intro: string, links: string) => {
  let _sql = `UPDATE \`user\` SET intro = '${intro}', links = '${links}' WHERE uid = ${uid}`
  return dbquery(_sql)
}
