import dotenv from 'dotenv'

dotenv.config()

export default {
	server: {
		port: process.env.PORT
	}
}