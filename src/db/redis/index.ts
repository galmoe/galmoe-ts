import * as Redis from 'ioredis'

export const redis = new Redis({
  port: 6379,
  host: '192.168.10.101',
  password: 'redisRoot',
  family: 4,
  db: 0
})
