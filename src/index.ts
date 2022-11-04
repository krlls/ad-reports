import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import { routers } from './routes'
import { serverConfig } from './configs/app.config'

const { port } = serverConfig
const app = new Koa()

app.use(bodyParser())

routers(app)

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
