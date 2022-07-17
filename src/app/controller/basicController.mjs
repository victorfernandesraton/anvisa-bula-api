export class BasicController {
	responseJson({ response, data }) {
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(data));
	}
	responseNotFound({ response }) {
		response.writeHead(404)
		response.end();
	}
}