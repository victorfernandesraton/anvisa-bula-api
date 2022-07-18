import config  from '../../config/index.mjs'
import http from 'node:http'
import handler from '../handler/index.mjs'
import log from '../log/index.mjs'
import cache from '../../service/cache/index.mjs'

await cache.connect()

const server = http.createServer((request, response) => handler(request, response, cache))

server.on('listening', () => log(`server listening in ${config.server.port}`))

export {
	server
}