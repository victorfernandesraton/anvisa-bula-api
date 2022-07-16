export class BasicController {
	responseJson({response, data}) {
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(data));
	}
}