import { mysqlClientConfig } from '../../../config'
import { createPool } from 'mysql'

const pool = createPool(mysqlClientConfig)


export const dbquery = (sql:string, values?:any[]):Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err:any, connection:any) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err:any, rows:any[]) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
