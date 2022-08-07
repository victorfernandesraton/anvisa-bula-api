import { launch } from 'puppeteer'

export const scrapperFactory = async ({ productin, timeout = 3000, args = [
	'--disable-gpu',
	'--disable-setuid-sandbox',
	'--disable-dev-shm-usage',
	'--no-first-run',
	'--no-sandbox',
	'--no-zygote',
	'--single-process',
]
}) => {
	const browser = await launch({
		headless: productin,
		args,
		timeout
	})
	return browser
}