import {MedicItem} from '../entity/medicItem.mjs'

export class FindAllBulas {
	constructor(browser) {
		this.browser = browser
	}

	/**
	 * 
	 * @param {{
	 * name?: string
	 * registerNumber?: string
	 * bulaId?: string | number
	 * retailCnpj?: string | number
	 * }} param0 
	 * @returns {Promise<MedicItem[]>}
	 */
	async execute ({  name, registerNumber, bulaId,  retailCnpj  }) {
		let result = []
	
		const page = await this.browser.newPage()
		await page.goto('https://consultas.anvisa.gov.br/#/bulario/', {
			waitUntil: 'networkidle2',
			timeout: 0
		})
	
		await page.waitForSelector('autocomplete > div > input')
	
		if (name) {
			await page.type('autocomplete > div > input', name)
		}
	
		if (retailCnpj) {
			await page.type('input[ng-model="empresa.cnpj"]', retailCnpj)
		}
	
		if (bulaId) {
			await page.type('#txtNumeroExpedienteBula', bulaId)
		}
	
		if(registerNumber) {
			await page.type('#txtNumeroRegistro', registerNumber)
		}
	
		await page.click('.btn-primary')
	
		await page.waitForSelector('td.col-sm-1')
	
		const table = await page.$$('tr')
	
		for (const line of table) {
			const [data, links] = await Promise.all([line.$$('td.col-sm-1.ng-binding'),line.$$('td.col-sm-1 > a')])
			const linkResult = await Promise.all(links.map(item => item.evaluate(node => ({
				content: node.innerHTML,
				link: node.href
			}))))
	
			const [sellerInfo, bulaId, publishedAt] = await Promise.all(data.map(item => item.evaluate(node => node.innerHTML)))
			const [medicamentInfo, bulaInfo, docBulaInfo] = linkResult.filter(item => !!item)
	
			if (linkResult[0]) {
				result.push(MedicItem.create({
					name: medicamentInfo.content,
					seller: sellerInfo,
					doctorBulaURI: docBulaInfo.link,
					patientBulaURI: bulaInfo.link,
					publishedAt,
					bulaId,
				}))
			}
		}
		return result
	}
}