import { dbquery } from '../../db/mysql'
import { UserType } from './User'
import { md5SUFFIX } from "../../../lib/md5";

export const register = async (user: UserType) => {
  let _sql = `INSERT INTO \`user\` (uname, email, pwd, register) VALUES ('${user.uname}', '${user.email}', '${md5SUFFIX(user.pwd)}', NOW())`
  return dbquery(_sql)
}

export const getUserSession = async (uid: number) => {
  let _sql = `SELECT uid, uname, avatar FROM \`user\` WHERE uid = ${uid}`
  return dbquery(_sql)
}

export const getPwd = async (email: string) => {
  let _sql = `SELECT uid, pwd  FROM \`user\` WHERE email = '${email}'`
  return dbquery(_sql)
}

export const getUserSessionByName = async (uname: number) => {
  let _sql = `SELECT uid, uname, avatar FROM \`user\` WHERE uname = '${uname}'`
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
