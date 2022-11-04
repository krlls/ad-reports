import Router from 'koa-router'

import { vkRoutes } from './vkRoutes'
import { respond200plain } from '../utils/response'
import { Api } from '../types/TApi'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))
  rootRouter.use(Api.Vk.PREFIX, vkRoutes)

  app.use(rootRouter.routes())
}
