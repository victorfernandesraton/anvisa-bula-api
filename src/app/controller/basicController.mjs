import { TimeoutError } from 'puppeteer'
import config from '../../config/index.mjs'
// eslint-disable-next-line no-unused-vars
import { BasicScrapper } from '../../scrapper/basicScrapper.mjs'
import log from '../log/index.mjs'

export class BasicController {
	/**
	 *
	 * @param {cache} cache
	 * @param {BasicScrapper} service
	 * @param {*} ttl
	 */
	constructor (cache, service, ttl) {
		if (cache) {
			this.cache = cache
			this.ttl = ttl ?? config.cache.ttl ?? 1000
		}
		this.service = service
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

	/**
	 *
	 * @param {Request} request
	 * @param {Response} response
	 */
	async findAll(request, response) {
		try {
			const query = request.query
			const data = await this.service.execute(query)
			this.responseJson({
				request,
				response,
				data,
			})
		} catch (error) {
			if (error instanceof TimeoutError) {
				this.responseNotFound({
					response,
					request,
				})
			} else {
				switch (error.name) {
				case 'NotFoundError':
					return this.responseNotFound({
						response,
						request,
					})

				default:
					throw error
				}
			}
		}
	}
}
