export class BasicController {
	/**
	 * 
	 * @param {{response: Response, data: any}} param0 
	 * @returns {Response}
	 */
	responseJson({ response, data }) {
		response.writeHead(200, { 'Content-Type': 'application/json' });
		return response.end(JSON.stringify(data));
	}
	/**
	 * 
	 * @param {{response: Response}} param0 
	 * @returns {Response}
	 */
	responseNotFound({ response }) {
		response.writeHead(404)
		return response.end();
	}
}