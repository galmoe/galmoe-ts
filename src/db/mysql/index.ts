// const mysql = require('mysql')
// import * as mysql from 'mysql'
import {mysqlClientConfig} from '../../../config'
const mysql = require('mysql')

const pool = mysql.createPool({
  host: mysqlClientConfig.host,
  user: mysqlClientConfig.user,
  password: mysqlClientConfig.password,
  database: mysqlClientConfig.database,
  port: mysqlClientConfig.port
})

export const dbquery = (sql:string, values?:any) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err:any, connection:any) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err:any, rows:any) => {
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
