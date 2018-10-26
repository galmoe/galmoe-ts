import { dbquery } from '../../db/mysql'

interface File {
  hash: string,
  uid: number,
  size_simple: string,
  type: string
}

export const saveInfo = async (file: File) => {
  let _sql = `INSERT INTO upload (\`hash\`, uid, date, size_simple, type) VALUES ('${file.hash}', ${file.uid}, NOW(), '${file.size_simple}', '${file.type}')`
  return dbquery(_sql)
}
