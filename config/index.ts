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
  user?: string;
  password?: string;
  db?: number;
  prefix?:string;
  ttl?: number;
  family?: number;    // ipv4 ? ipv6
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
  port: 6379,
  host: '127.0.0.1',
  user: '',
  password: '',
  family: 4,
  db: 0
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
export const host = 'http://localhost:3000'

export function uploadDir(): string {
  return path.join(__dirname, `../public/files/`)
}
