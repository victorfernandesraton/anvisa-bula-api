import { handleError } from '../error/handlerError.mjs'
import { routes } from '../routes/index.mjs'

export default  async function (req, res, cache) {
	try {
		await routes(req, res, cache)
	} catch (error) {
		return handleError(error, res)
	}
}