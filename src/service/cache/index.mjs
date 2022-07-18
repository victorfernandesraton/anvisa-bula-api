import { createClient } from 'redis'
import config from '../../config/index.mjs'

export default createClient({
	url: `redis://${config.cache.domain}:${config.cache.port}`,
	password: config.cache.password,
}).on('error', (err) => console.log('Redis Client Error', err))