import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { routers } from '../../routes'

const app = new Koa()

app.use(bodyParser())

routers(app)

export const App = app
