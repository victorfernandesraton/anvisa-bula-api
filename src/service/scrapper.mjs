import { launch } from 'puppeteer'

export const scrapperFactory =async ({ productin }) => {
	const browser = await launch({
		headless: productin,
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

	return browser
}