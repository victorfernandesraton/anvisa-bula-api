import  config from './src/config/index.mjs'
import { server } from './src/app/http/index.mjs';

server.listen(config.server.port)