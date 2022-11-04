import * as Router from 'koa-router'

import { postRoutes } from './postRoutes'
import { respond200plain } from '../utils/response'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))
  rootRouter.use('/posts', postRoutes)

  app.use(rootRouter.routes())
}
