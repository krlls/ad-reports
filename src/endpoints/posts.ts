import { RouterContext } from 'koa-router'

import { Posts } from '../types'

import { respond400, respond200json } from '../utils/response'
import { PostsStore } from '../store/PostsStore'
import { postsListReq } from '../validators/postsSchemes'
import { validate } from '../utils/validate'

export const list = async (ctx: RouterContext, params: Posts.List.Req) => {
  if (validate(postsListReq, params)) {
    return respond400(ctx)
  }

  const { id } = params
  const body = await PostsStore.findPost(id)

  respond200json(ctx, body)
}
