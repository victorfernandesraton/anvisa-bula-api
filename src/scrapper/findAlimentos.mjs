import { Alimento } from '../entity/alimento.mjs'
import { BasicScrapper } from './basicScrapper.mjs'
import { NotFoundError } from './error/notFoundError.mjs'

export class FindAlimentos  extends BasicScrapper {
	/**
 * 
	* @param {import('puppeteer').Browser} browser 
	*/
	constructor(browser) {
		super(browser)
	}
	async execute({name }) {
		let result = []
		const page = await this.browser.newPage()
		await page.goto('https://consultas.anvisa.gov.br/#/alimentos/', {
			waitUntil: 'networkidle2',
			timeout: 0
		})
		await page.waitForSelector('input[ng-model="filter.nomeProduto"]')
		if (name ) {
			await page.type('input[ng-model="filter.nomeProduto"]', name)
		}

		await page.click('.btn-primary')

		const isValid = await Promise.race([this.sucessRequest(page), this.errorRequest(page)])
		if (isValid.error) {
			await this.browser.close()
			throw new NotFoundError()			
		}

		const table = await page.$$('tr[ng-repeat="alimento in lista"]')
		for (const line of table) {
			const data = await line.$$('td[ng-click="detail(alimento)"]')
			const [name, registerId, process, seller, , expiredIn] = await Promise.all(data.map(item => item.evaluate(node => node.innerHTML)))
			result.push(Alimento.create({name,registerId, process, seller, expiredIn }))
		}
		return result
	}
}