import {dbquery} from '../../db/mysql'

export const getUserSession = async (uid: number) => {
  let _sql = `SELECT * FROM \`user\` WHERE uid = '${uid}'`
  return dbquery(_sql)
}

export const getUserPubSession = async (uid: number) => {
  let _sql = `SELECT * FROM \`user\` WHERE uid = '${uid}'`
  return dbquery(_sql)
}
