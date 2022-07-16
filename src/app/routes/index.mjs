import { scrapperFactory } from "../../service/scrapper.mjs";
import { FindAllBulasController } from "../controller/findAllBulas.mjs";
import { parseQueryFromURL } from "../utils/parseQuery.mjs";


export const routes = async (req, res) => {
	const screapperService = await scrapperFactory({productin: true})
	let { method, url, headers } = req;
	req.query = parseQueryFromURL(url).query

	if (method === 'GET' && !url || url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('okay');
		return
	}

	if (method === 'POST' && url.startsWith('/bula')) {
		const handler = new FindAllBulasController({
			browser: screapperService
		}) 
		await handler.getAllBulas(req, res)
		await screapperService.close()
		return
	}

	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('not found');
}