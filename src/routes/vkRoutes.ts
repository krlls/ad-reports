import Router from 'koa-router'

import { getAuth, posts, postsStats, saveToken } from '../endpoints/vk'
import { Api } from '../types/TApi'

const router = new Router()

router.get(Api.Vk.AuthLink.URL, (ctx) => getAuth(ctx))
router.get(Api.Vk.SaveToken.URL, (ctx) => saveToken(ctx, ctx.query))
router.get(Api.Vk.Posts.URL, (ctx) => posts(ctx, ctx.query))

router.post(Api.Vk.PostStats.URL, (ctx) => postsStats(ctx, ctx.request.body))

export const vkRoutes = router.routes()
