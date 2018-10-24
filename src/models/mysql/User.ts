import {dbquery} from '../../db/mysql'

interface User {
  uid?:number;
  uname?:string;
}

export const getUserByName = async (uname: string) => {
  let _sql = `SELECT * FROM \`user\` WHERE uname = '${uname}'`
  return dbquery(_sql)
}

export const getUserById = async (uid: number) => {
  let _sql = `SELECT * FROM \`user\` WHERE uid = ${uid}`
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