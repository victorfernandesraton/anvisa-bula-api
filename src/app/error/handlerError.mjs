export const handleError = (error, response) => {
	if (error.message.includes('ENOENT')) {
		console.warn(`asset not found ${error.stack}`)
		response.writeHead(404)
		return response.end()
	}

	console.error(`caught error on API ${error.stack}`)
	response.writeHead(500)
	return response.end()
}

