import { RouterContext } from 'koa-router'
import { isArray } from 'lodash'

import { respond200Html, respond200json, respond200plain, respond400 } from '../utils/response'
import { VK_AUTH_LINK } from '../config'
import { Api } from '../types/TApi'
import { postsReq, saveTokenReq } from '../validators/postsSchemes'
import { validate } from '../utils/validate'
import { VkRequest } from '../modules/Request'
import { toVkId } from '../utils/links'

export const getAuth = async (ctx: RouterContext) => {
  const html = `
    <html lang="en">
      <body>
         <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <h1><a target="_blank" href="${VK_AUTH_LINK}">Vk Auth link</a></h1>
         </div>
      </body>
    </html>
`

  respond200Html(ctx, html)
}

export const saveToken = async (ctx: RouterContext, params: Api.Vk.SaveToken.Req) => {
  if (validate(saveTokenReq, params)) {
    return respond400(ctx)
  }

  respond200plain(ctx, 'token: ')
}

export const posts = async (ctx: RouterContext, params: Api.Vk.Posts.Req) => {
  const error = validate(postsReq, params)
  if (error) {
    return respond400(ctx, { error })
  }

  const posts = await VkRequest.getPosts(toVkId(params.groupId))

  if (!posts || !isArray(posts?.response?.items)) {
    return respond400(ctx)
  }

  const resp: Api.Vk.Posts.Resp = posts.response

  respond200json(ctx, resp)
}
