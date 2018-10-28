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
