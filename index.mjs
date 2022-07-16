#!/home/victor_raton/.asdf/shims/node
import { connect, launch } from 'puppeteer';
import { executieRequest } from './src/scrapper/executeRequest.mjs';
(async () => {
	const browser = await launch({
		headless: process?.env?.NODE_ENV== 'production',
		args: [
			'--disable-gpu',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--no-first-run',
			'--no-sandbox',
			'--no-zygote',
			'--single-process',
		],
	})

	const response = await executieRequest(browser)({
		bulaId: '4816690212'
	})
	
	console.log(response)
	browser.close()
})()