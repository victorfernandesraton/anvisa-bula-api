import config  from '../../config/index.mjs'
import http from 'node:http'
import handler from '../handler/index.mjs'
import log from '../log/index.mjs'

const server = http.createServer(handler)

server.on('listening', () => log(`server listening in ${config.server.port}`))

export {
	server
}