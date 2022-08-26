export class BasicScrapper {
	/**
	 * 
	 * @param {import('puppeteer').Browser} browser 
	 */
	constructor(browser) {
		this.browser = browser
	}

	async sucessRequest(page) {
		const sucess = await page.waitForSelector('td.col-sm-1')
		return { sucess: !!sucess }
	}

	async errorRequest(page) {
		const toast = await page.waitForSelector('.toast-warning')
		return { error: !!toast }
	}

	/**
	 * 
	 * @param {*} _query 
	 * @returns {Promise} Promise
	 */
	// eslint-disable-next-line no-unused-vars
	async execute(query) {
		throw new Error('not implemented')
	}
}