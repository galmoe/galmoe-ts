import * as Redis from 'ioredis'
import { redisClientConfig } from '../../../config'

export const redis = new Redis(redisClientConfig)
