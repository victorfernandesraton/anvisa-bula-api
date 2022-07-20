import { createClient } from 'redis'
import log from '../../app/log/index.mjs'
import config from '../../config/index.mjs'

const url = `redis://${config.cache.domain}:${config.cache.port}`

let cache = null

if (config.cache.domain) {

	cache = createClient({
		url: url,
		password: config.cache.password,
	}).on('error', (err) => log('Redis Client Error', err))
		.on('connect', () => log(`Cache connected with ${url}`))
		.on('reconnect', () => log('Cache reconnected with ${url}'))
}

export default cache