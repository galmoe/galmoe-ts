import * as path from 'path'
import { RedisStore } from "../src/models/redis/Session";
// import * as dotenv from "dotenv";
// dotenv.config();
// let path;
// switch (process.env.NODE_ENV) {
//   case "test":
//     path = `${__dirname}/../../.env.test`;
//     break;
//   case "production":
//     path = `${__dirname}/../../.env.production`;
//     break;
//   default:
//     path = `${__dirname}/../../.env.development`;
// }
// dotenv.config({ path: path });
import { ConnectionConfig } from 'mysql'

interface Serve {
  port: number;
  host?: string;
  cors?: string;
  maxAge?: number;
}

interface SessionConfig {
  key: string;
  maxAge: number;
  overwrite?: boolean;
  httpOnly?: boolean;
  signed?: boolean;
  rolling?: boolean;
  renew?: boolean;
  store: any;
}

export const serve:Serve = {
  port: 3000,
  cors: 'http://192.168.10.101:8080',
  maxAge: 7 * 24 * 60 * 60 // 7 days cache
}

export const mysqlClientConfig:ConnectionConfig = {
  host: '192.168.10.101',
  port: 3306,
  user: 'mysql8',
  password: '111111',
  database: 'galmoe_material',
  multipleStatements: true
}

export const sessionConfig:SessionConfig = {
  key: 'gal:sess',
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  store: new RedisStore()
}


// export const host = 'http://47.94.16.206'
export const host = 'http://192.168.10.101'

export function uploadDir(): string {
  return path.join(__dirname, `../public/images/`)
}
