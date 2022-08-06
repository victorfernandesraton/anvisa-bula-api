export class FindAlimentos {
	/**
 * 
	* @param {import('puppeteer').Browser} browser 
	*/
		constructor(browser) {
		this.browser = browser
	}
	async execute({name, processId }) {
		let result = []
		const page = await this.browser.newPage("https://consultas.anvisa.gov.br/#/alimentos/", {
			waitUntil: 'networkidle2',
			timeout: 0
		})
		await page.waitForSelector(`form[name="formulario"]`)
		if (name ) {
			await page.type(`input[ng-model="filter.nomeProduto"]`, name)
		}

		await page.click('.btn-primary')
		return result
	}
}