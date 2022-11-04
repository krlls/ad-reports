import * as Router from 'koa-router'

import { list } from '../endpoints/posts'

const router = new Router()

router.get('/list', (ctx) => list(ctx, ctx.query))

export const postRoutes = router.routes()
