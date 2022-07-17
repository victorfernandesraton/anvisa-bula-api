import { handleError } from "../error/handlerError.mjs"
import { routes } from "../routes/index.mjs"

export default function (req, res) {
	try {
		return routes(req, res)
	} catch (error) {
		return handleError(error, res)
	}
}