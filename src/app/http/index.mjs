import config from '../../config/index.mjs'
import http from 'node:http'
import handler from '../handler/index.mjs'
import log from '../log/index.mjs'
import cache from '../../service/cache/index.mjs'
let client = null

if (config.cache.domain) {
	client = cache
	await client.connect()
}

const server = http.createServer((request, response) => handler(request, response, client))

server.on('listening', () => log(`server listening in ${config.server.port}`))

export {
	server
}