import log from "../log/index.mjs";

export class BasicController {
	constructor(cache) {
		if (cache) {
			this.cache = cache;
		}
	}
	/**
	 * 
	 * @param {{response: Response, data: any}} param0 
	 * @returns {Response}
	 */
	async responseJson({ request, response, data }) {
		try {
			if (this.cache) {
				await this.saveDataInCache({
					request, data, status: 200
				})
			}
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(data));
		} catch (error) {
			log(error)
			response.writeHead(200, { 'Content-Type': 'application/json' });
			return response.end(JSON.stringify(data));
		}
	}
	/**
	 * 
	 * @param {{response: Response}} param0 
	 * @returns {Response}
	 */
	async responseNotFound({ request, response }) {
		try {

			if (this.cache) {
				await this.saveDataInCache({
					request, data, status: 404
				})
			}
			response.writeHead(404)
			return response.end();
		} catch (error) {
			log(error)
			response.writeHead(404)
			return response.end();
		}
	}

	/**
	 * 
	 * @param {{request: Request}}  
	 */
	async findDataInCache(request, response) {
		const key = request.url
		if (this.cache) {
			const isExist = await this.cache.exists(key)
			if (isExist) {
				const cached = await this.cache.get(key)
				const { data, status } = JSON.parse(cached)
				if (status === 200) {
					return this.responseJson({ request, response, data })
				}
			}
		}
	}
	/**
	 * 
	 * @param {{request: Request, data: any, status: number}} param0 
	 */
	async saveDataInCache({ request, data, status }) {
		const key = request.url
		if (this.cache) {
			await this.cache.set(key, JSON.stringify({ status, data }))
		}
	}
}