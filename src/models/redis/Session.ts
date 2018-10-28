import { Context } from "koa";
import { sessionConfig } from "../../../config";
import { redis } from "../../db/redis";
const { Store } = require("koa-session2");

export class RedisStore extends Store {
  constructor() {
    super();
    this.redis = redis;
  }

  async get(sid: number, ctx: Context) {
    let data = await this.redis.get(`s${sid}`);
    return JSON.parse(data);
  }

  async set(session: any, {sid = this.getID(24), maxAge = sessionConfig.maxAge } = {}, ctx: Context) {
    try {
      /*
      * 设置session过期
      * key EX 单位为秒， maxAge和sessionConfig相同
      * */
      await this.redis.set(`s${sid}`, JSON.stringify(session), 'EX', sessionConfig.maxAge);
    } catch (e) {
      console.error(e)
    }
    return sid;
  }

  async destroy(sid: number, ctx: Context) {
    return await this.redis.del(`s${sid}`);
  }
}
