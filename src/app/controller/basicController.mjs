import config from '../../config/index.mjs'
import log from '../log/index.mjs'

export class BasicController {
	/**
	 *
	 * @param {cache} cache
	 * @param {*} ttl
	 */
	constructor (cache, ttl) {
		if (cache) {
			this.cache = cache
			this.ttl = ttl ?? config.cache.ttl ?? 1000
		}
	}

	/**
	 *
	 * @param {{response: Response, data: any, request: Request, revalidate: boolean}} param0
	 * @returns {Response}
	 */
	async responseJson ({ request, response, data, revalidate = true }) {
		try {
			if (this.cache && revalidate) {
				await this.saveDataInCache({
					request, data, status: 200
				})
			}
			response.writeHead(200, { 'Content-Type': 'application/json' })
			return response.end(JSON.stringify(data))
		} catch (error) {
			log(error)
			response.writeHead(200, { 'Content-Type': 'application/json' })
			return response.end(JSON.stringify(data))
		}
	}

	/**
	 *
	 * @param {{response: Response, request: Request, revalidate: boolean}} param0
	 * @returns {Response}
	 */
	async responseNotFound ({ request, response, revalidate = true }) {
		try {
			if (this.cache && revalidate) {
				await this.saveDataInCache({
					request, data: [], status: 404
				})
			}
			response.writeHead(404)
			return response.end()
		} catch (error) {
			log(error)
			response.writeHead(404)
			return response.end()
		}
	}

	/**
	 *
	 * @param {{request: Request}}
	 */
	async findDataInCache (request, response) {
		const key = request.url
		if (this.cache) {
			const isExist = await this.cache.exists(key)
			if (isExist) {
				const cached = await this.cache.get(key)
				const { data, status } = JSON.parse(cached)
				if (status === 200) {
					return this.responseJson({ request, response, data, revalidate: false })
				} else {
					return this.responseNotFound({ request, response, revalidate: false })
				}
			}
		}
	}

	/**
	 *
	 * @param {{request: Request, data: any, status: number}} param0
	 */
	async saveDataInCache ({ request, data, status }) {
		const key = request.url
		if (this.cache) {
			await this.cache.set(key, JSON.stringify({ status, data }), {
				EX: this.ttl,
				NX: true
			})
		}
	}
}
