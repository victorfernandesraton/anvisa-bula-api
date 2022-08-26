import { scrapperFactory } from '../../service/scrapper.mjs'
import { FindAlimentosController } from '../controller/findAlimentos.mjs'
import { FindAllBulasController } from '../controller/findAllBulas.mjs'
import { parseQueryFromURL } from '../utils/parseQuery.mjs'
import { BULA_ROUTER, DEFAULT, ALIMENTO_ROUTER } from './constants.mjs'


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
export const routes = async (req, res, cache) => {
	const screapperService = await scrapperFactory({ productin: true })
	let { method, url } = req
	req.query = parseQueryFromURL(url).query

	if (method === 'GET' && !url || url === DEFAULT) {
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end('live :)')
		return
	}

	if (method === 'GET') {

		let handler = null
		if (url.startsWith(BULA_ROUTER)) {
			handler = new FindAllBulasController({
				browser: screapperService,
				cache
			})
		}
		if (url.startsWith(ALIMENTO_ROUTER)) {
			handler = new FindAlimentosController({
				browser: screapperService,
				cache
			})
		}

		if (handler) {
			if (cache) {
				await handler.findDataInCache(req, res)
			}
			await handler.findAll(req, res)
			await screapperService.close()
			return
		}
	}

	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.end('not found')
	return
}