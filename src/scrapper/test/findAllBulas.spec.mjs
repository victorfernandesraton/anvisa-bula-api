import {describe, test, expect, beforeAll, afterAll, jest} from '@jest/globals'
import {scrapperFactory} from '../../service/scrapper.mjs'
import {  FindAllBulas} from '../findAllBulas.mjs'

describe('findAlimentos', () => { 
	let stub;
	let browser
	
	jest.setTimeout(500000)
	beforeAll( async () => {
		browser = await scrapperFactory({productin: false})
		stub = new FindAllBulas(browser)
	})
	
	afterAll( async ( ) => {
		await browser.close()
	})
	test('shoud be found empty request', async () => {
		const data = await stub.execute({name: "tyle"})
		expect(data.length).not.toEqual(0)
	})
})