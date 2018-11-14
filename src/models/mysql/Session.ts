import { dbquery } from '../../db/mysql'
import { UserType } from './User'
import { md5SUFFIX } from "../../../lib/md5"


export const register = async (user: UserType) => {
  let _sql = `INSERT INTO \`user\` (uname, email, pwd, register) VALUES ('${user.uname}', '${user.email}', '${md5SUFFIX(user.pwd)}', NOW())`
  return dbquery(_sql)
}

export const getUserSession = async (uid: number) => {
  let _sql = `SELECT uid, uname, email, avatar FROM \`user\` WHERE uid = ${uid}`
  return dbquery(_sql)
}
export const getPwd = async (email: string) => {
  let _sql = `SELECT uid, pwd  FROM \`user\` WHERE email = '${email}'`
  return dbquery(_sql)
}

export const getPwdById = async (uid: number) => {
  let _sql = `SELECT uid, pwd  FROM \`user\` WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const privateInfo = async (uid: number) => {
  let _sql = `SELECT uid, uname, avatar, sign, email FROM \`user\` WHERE uid = '${uid}'`
  return dbquery(_sql)
}

export const getUserSessionByEmail = async (email: string) => {
  let _sql = `SELECT uid, uname, avatar FROM \`user\` WHERE email = '${email}'`
  return dbquery(_sql)
}

export const saveAvatar = async (uid: number, avatar: string) => {
  let _sql = `UPDATE \`user\` SET avatar = '${avatar}' WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const saveBackground = async (uid: number, background: string) => {
  let _sql = `UPDATE \`user\` SET background = '${background}' WHERE uid = ${uid}`
  console.log('saveBackground', _sql)
  return dbquery(_sql)
}

export const update = async (uid: number, user: UserType) => {
  let _sql = `UPDATE \`user\` SET uname = '${user.uname}', email = '${user.email}', sign = '${user.sign}' WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const safety = async (uid: number, pwd: string) => {
  let _sql = `UPDATE \`user\` SET pwd = '${md5SUFFIX(pwd)}' WHERE uid = ${uid}`
  return dbquery(_sql)
}
