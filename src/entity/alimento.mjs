export class Alimento {
	constructor({name, registerId, process, expiredIn, seller}) {
		this.name = name
		this.registerId = registerId
		this.process = process
		if (seller) {
			const [sellerName, sellerCnpj] = seller.split('-').map(item => item.trim())
			this.seller =  {
				cnpj: sellerCnpj,
				name: sellerName
			}
		}
		if (expiredIn) {
			const [ month, year] = expiredIn.split('/')
			this.expiredIn = {
				year,month
			}
		}
	}
	static create({name, registerId, process, expiredIn, seller}) {
		return new Alimento({
			name,
			expiredIn, 
			process, 
			registerId,
			seller
		}) 
	}
}