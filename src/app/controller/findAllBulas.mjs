import { TimeoutError } from "puppeteer";
import { FindAllBulas } from "../../scrapper/findAllBulas.mjs";
import { parseQueryToURL } from "../utils/parseQuery.mjs";
import { BasicController } from "./basicController.mjs";

export class FindAllBulasController extends BasicController {
	constructor({
		browser,
		cache
	}) {
		super(cache);
		this.findAllBulaService = new FindAllBulas(browser)
	}

	/**
	 * 
	 * @param {Request} request 
	 * @param {Response} response 
	 */
	async getAllBulas(request, response) {
		try {
			const query = request.query
			const data = await this.findAllBulaService.execute(query)
			this.responseJson({
				request,
				response,
				data
			})
		} catch (error) {
			if (error instanceof TimeoutError) {
				this.responseNotFound({
					response,
					request
				})
			} else {
				throw error
			}
		}
	}
}