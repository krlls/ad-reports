import Router from 'koa-router'
import clc from 'cli-color'

import { vkRoutes } from './vkRoutes'
import { respond200plain } from '../utils/response'
import { Api } from '../types/TApi'
import { NodeApiLogger } from '../modules/Logger'

const rootRouter = new Router()

export const routers = (app: any) => {
  rootRouter.use(async (ctx, next) => {
    NodeApiLogger.info(clc.yellow(ctx.request.method.toUpperCase()), ctx.request.url, ctx.params, ctx.request.body)
    await next()
  })
  rootRouter.get('/', (ctx) => respond200plain(ctx, '🔥 Hello world!'))
  rootRouter.use(Api.Vk.PREFIX, vkRoutes)

  app.use(rootRouter.routes())
}
