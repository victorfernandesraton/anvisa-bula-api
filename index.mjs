import http from 'node:http';
import { handleError } from './src/app/error/handlerError.mjs';
import { routes } from './src/app/routes/index.mjs';

const handler = async (req, res) => {
	try {
		return routes(req, res)
	} catch (error) {
		return handleError(error, res)
	}
}

const server = http.createServer(handler)

server.listen(8000)
	.on('listening', () => console.log('listening on port 8000'))
