import { RouterContext } from 'koa-router'

import { respond200Html, respond200json, respond200plain, respond400 } from '../utils/response'
import { VK_AUTH_LINK, VK_TOKEN } from '../config'
import { Api } from '../types/TApi'
import { postsReq, saveTokenReq } from '../validators/postsSchemes'
import { validate } from '../utils/validate'
import { VkRequest } from '../modules/Request'
import { toVkId } from '../utils/links'
import { VkImporter } from '../modules/VkImporter'

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
  if (validate(postsReq, params)) {
    return respond400(ctx)
  }
  const vkApi = new VkRequest(VK_TOKEN)
  const vkImporter = new VkImporter(vkApi)

  const posts = await vkImporter.posts(toVkId(params.groupId))

  const resp: Api.Vk.Posts.Resp = { posts }

  respond200json(ctx, resp)
}
