import {dbquery} from '../../db/mysql'

interface File {
  hash: string,
  uid?:number,
  uname?:string,
  size: number,
  size_simple: string,
  type: string
}

export const saveInfo = async (file: File) => {
  let _sql = `INSERT INTO upload (\`hash\`, uid, uname, date, size, size_simple, type) VALUES ('${file.hash}', ${file.uid}, '${file.uname}', NOW(), '${file.size}', '${file.size_simple}', '${file.type}')`
  return dbquery(_sql)
}
