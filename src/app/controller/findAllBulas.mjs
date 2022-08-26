import { FindAllBulas } from '../../scrapper/findAllBulas.mjs'
import { BasicController } from './basicController.mjs'

export class FindAllBulasController extends BasicController {
	constructor({ browser, cache }) {
		super(cache, new FindAllBulas(browser))
	}
}
