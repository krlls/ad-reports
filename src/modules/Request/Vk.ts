import { isArray } from 'lodash'

import { Api } from './Api'
import { VK_URl } from '../../config'
import { Request } from '../../types/TRequest'
import { ReqApiLogger } from '../Logger'

export class VkRequest implements Request.Vk.Api {
  private readonly token: string
  private readonly api: Api = new Api(VK_URl)
  private readonly apiVersion = '5.131'

  constructor(token: string) {
    this.token = token
  }

  logReq = (name: string, data: Record<string, any>) => ReqApiLogger.info(`VK Req ${name}`, data)

  async getPosts(groupId: string) {
    this.logReq('getPosts', { groupId })

    return this.api.req<Request.Vk.Posts.GetPosts.Params, Request.Vk.Posts.GetPosts.Resp>({
      method: Request.Vk.Posts.GetPosts.METHOD,
      url: Request.Vk.Posts.GetPosts.URL,
      params: {
        access_token: this.token,
        owner_id: groupId,
        v: this.apiVersion,
      },
    })
  }

  getPostStats(groupId: string, postId: string | string[]) {
    this.logReq('getPostStats', { groupId, postId })
    const postIdArr = isArray(postId) ? postId : [postId]

    return this.api.req<Request.Vk.Stats.Post.Params, Request.Vk.Stats.Post.Resp>({
      method: Request.Vk.Stats.Post.METHOD,
      url: Request.Vk.Stats.Post.URL,
      params: {
        access_token: this.token,
        owner_id: groupId,
        post_ids: postIdArr,
        v: this.apiVersion,
      },
    })
  }
}
