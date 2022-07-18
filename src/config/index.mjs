import dotenv from 'dotenv'

dotenv.config()

export default {
	server: {
		port: process.env.PORT
	},
	cache: {
		username: process.env.REDIS_USER,
		password: process.env.REDIS_PASS,
		database: process.env.REDIS_DATABASE,
		port: process.env.REDIS_PORT,
		domain: process.env.REDIS_HOST,
	}
}