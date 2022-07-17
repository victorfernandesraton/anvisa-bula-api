export class MedicItem {
	/**
	 * @param {{
	 * name: string,
	 * seller: any,
	 * publishedAt: string,
	 * bulaId: string
	 * patientBulaURI: URL
	 * doctorBulaURI: URL
	 * }}
	 */
	constructor({
		name,
		doctorBulaURI,
		patientBulaURI,
		publishedAt,
		bulaId,
		seller
	}) {
		this.name = name;
		this.bula = {
			doctor: doctorBulaURI,
			patient: patientBulaURI,
		}
		const [nameSeller, cnpj] = seller.split('-').map(item => item.trim())
		this.seller = {
			name: nameSeller,
			cnpj
		}
		this.publishedAt = publishedAt;
		this.id = bulaId;
	}

	/**
	* @param {{
	 * name: string,
	 * seller: any,
	 * bulaId: string
	 * publishedAt: string,
	 * patientBulaURI: URL
	 * doctorBulaURI: URL
	 * }}
	 * @return {MedicItem}
	 */
	static create({ name, doctorBulaURI, patientBulaURI, publishedAt, seller, bulaId }) {
		return new MedicItem({
			name,
			doctorBulaURI,
			patientBulaURI,
			publishedAt,
			bulaId,
			seller
		})
	}
}