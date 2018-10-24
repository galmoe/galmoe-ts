import * as path from 'path'

interface Serve {
  port: number;
  host?: string;
  cors?: string;
  maxAge?: number;
}

interface MysqlClient {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

interface RedisClient {
  host: string;
  port: number;
  ttl: number;
  password: string;
  db: number;
  prefix?:string;
}

export const serve:Serve = {
  port: 3000,
  cors: 'http://localhost:8080',
  maxAge: 7 * 24 * 60 * 60 // 7 days cache
}

export const mysqlClientConfig:MysqlClient = {
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '111111',
  database: 'galmoe_material'
}

export const redisClientConfig:RedisClient = {
  host: '127.0.0.1',
  port: 6397,
  ttl: 60*60*23,
  password: '111111',
  db: 0
}

export function uploadDir(): string {
  return path.join(__dirname, `../public/files/`)
}
