import {mysqlClientConfig} from '../../../config'
import { createPool } from 'mysql'

const pool = createPool({
  host: mysqlClientConfig.host,
  user: mysqlClientConfig.user,
  password: mysqlClientConfig.password,
  database: mysqlClientConfig.database,
  port: mysqlClientConfig.port
})


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
