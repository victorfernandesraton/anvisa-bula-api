import {describe, test, expect, beforeAll, afterAll, jest} from '@jest/globals'
import {scrapperFactory} from '../../service/scrapper.mjs'
import { FindAlimentos } from '../findAlimentos.mjs'

describe('findAlimentos', () => { 
	let stub;
	let browser
	
	jest.setTimeout(500000)
	beforeAll( async () => {
		browser = await scrapperFactory({productin: true})
		stub = new FindAlimentos(browser)
	})
	
	afterAll( async ( ) => {
		await browser.close()
	})
	test('shoud be found empty request', async () => {
		const data = await stub.execute({name: "farinha"})
		expect(data).toHaveLength(0)
	})
})