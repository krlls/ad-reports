import { RouterContext } from 'koa-router'

import { respond200Html, respond200json, respond200plain, respond400 } from '../utils/response'
import { SHEET_ID, VK_AUTH_LINK, VK_TOKEN } from '../config'
import { Api } from '../types/TApi'
import { postsReq, postsStatsReq, reportReq, saveTokenReq } from '../validators/postsSchemes'
import { validate } from '../utils/validate'
import { VkRequest } from '../modules/Request'
import { toVkId } from '../utils/links'
import { VkImporter } from '../modules/VkImporter'
import { NodeApiLogger } from '../modules/Logger'
import { VkReport } from '../modules/VkReport'

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
  NodeApiLogger.info('GetAuthLink: Success')
}

export const saveToken = async (ctx: RouterContext, params: Api.Vk.SaveToken.Req) => {
  if (validate(saveTokenReq, params)) {
    NodeApiLogger.error('SaveToken: Validate error')
    return respond400(ctx)
  }

  respond200plain(ctx, 'token: ')
  NodeApiLogger.info('SaveToken: Success')
}

export const posts = async (ctx: RouterContext, params: Api.Vk.Posts.Req) => {
  if (validate(postsReq, params)) {
    NodeApiLogger.error('Posts: Validate error')
    return respond400(ctx)
  }
  const vkApi = new VkRequest(VK_TOKEN)
  const vkImporter = new VkImporter(vkApi)

  const posts = await vkImporter.posts(toVkId(params.groupId))

  const resp: Api.Vk.Posts.Resp = { posts }

  respond200json(ctx, resp)
  NodeApiLogger.info('Posts: Success')
}

export const postsStats = async (ctx: RouterContext, params: Api.Vk.PostStats.Req) => {
  if (validate(postsStatsReq, params)) {
    NodeApiLogger.error('PostsStats: Validate error')
    return respond400(ctx)
  }
  const vkApi = new VkRequest(VK_TOKEN)
  const vkImporter = new VkImporter(vkApi)

  const stats = await vkImporter.postsStats(toVkId(params.groupId), params.postId || params.postIds || '')

  const resp: Api.Vk.PostStats.Resp = { stats }

  respond200json(ctx, resp)
  NodeApiLogger.info('PostsStats: Success')
}

export const report = async (ctx: RouterContext, params: Api.Vk.Report.Req) => {
  if (validate(reportReq, params)) {
    NodeApiLogger.error('Report: Validate error')
    return respond400(ctx)
  }
  const vkApi = new VkRequest(VK_TOKEN)
  const vkImporter = new VkImporter(vkApi)

  const report = new VkReport({
    sheetId: SHEET_ID,
    groupId: toVkId(params.groupId),
    importer: vkImporter,
  })

  const result = await report.generatePostReport()

  const resp: Api.Vk.Report.Resp = { success: result }

  respond200json(ctx, resp)
  NodeApiLogger.info('Report: Success')
}
