import * as Router from 'koa-router'

import { getAuth, saveToken } from '../endpoints/vk'
import { Api } from '../types/TApi'

const router = new Router()

router.get(Api.Vk.AuthLink.URL, (ctx) => getAuth(ctx))
router.get(Api.Vk.SaveToken.URL, (ctx) => saveToken(ctx, ctx.query))

export const vkRoutes = router.routes()
