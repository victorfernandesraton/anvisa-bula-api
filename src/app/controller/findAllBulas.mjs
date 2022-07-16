import { FindAllBulas } from "../../scrapper/findAllBulas.mjs";
import { BasicController } from "./basicController.mjs";

export class FindAllBulasController extends BasicController {
	constructor({
		browser
	}) {
		super();
		this.findAllBulaService = new FindAllBulas(browser)
	}

	async getAllBulas(request, response) {
		const {query} = request
		const data = await this.findAllBulaService.execute(query)
		this.responseJson({response, data})
	}
}