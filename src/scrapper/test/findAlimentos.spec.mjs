import {describe, test, expect, beforeAll, afterAll, jest} from '@jest/globals'
import {scrapperFactory} from '../../service/scrapper.mjs'
import { FindAlimentos } from '../findAlimentos.mjs'

describe('findAlimentos', () => { 
	let stub
	let browser
	
	jest.setTimeout(500000)
	beforeAll( async () => {
		browser = await scrapperFactory({productin: true})
		stub = new FindAlimentos(browser)	
	})
	
	afterAll( async ( ) => {
		await browser.close()
	})

	test('shoud be found some food name', async () => {
		const data = await stub.execute({name: 'farinha'})
		console.log(data)
		expect(data).toEqual(expect.arrayContaining([
			expect.objectContaining({name: expect.any(String)})
		]))
	})
})