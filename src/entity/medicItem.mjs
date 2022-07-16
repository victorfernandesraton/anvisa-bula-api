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
		this.doctorBulaURI = doctorBulaURI;
		this.patientBulaURI = patientBulaURI;
		this.publishedAt = publishedAt;
		this.seller = seller;
		this.bulaId = bulaId;
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