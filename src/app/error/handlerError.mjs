import log from "../log/index.mjs"

/**
 * 
 * @param {Error} error 
 * @param {Response} response 
 * @returns {Response}
 */
export const handleError = (error, response) => {
	if (error.message.includes('ENOENT')) {
		log(`asset not found ${error.stack}`)
		response.writeHead(404)
		return response.end()
	}

	log(`caught error on API ${error.stack}`)
	if (process.env.NODE_ENV !== 'production') {
		log(error)
	}
	response.writeHead(500)
	return response.end()
}
