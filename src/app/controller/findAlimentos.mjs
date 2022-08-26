import { FindAlimentos } from '../../scrapper/findAlimentos.mjs'
import { BasicController } from './basicController.mjs'

export class FindAlimentosController extends BasicController {
	constructor({ browser, cache }) {
		super(cache, new FindAlimentos(browser))
	}
}
