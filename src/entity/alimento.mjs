export class Alimento {
	constructor({name, registerId, process, expiredIn}) {
		this.name = name
		this.registerId = registerId
		this.process = process
		if (expiredIn) {
			const [year, month] = expiredIn.split('/')
			this.expiredIn = {
				year,month
			}
		}
	}
	static create({name, registerId, process, expiredIn}) {
		return new Alimento({
			name,
			expiredIn, 
			process, 
			registerId
		}) 
	}
}