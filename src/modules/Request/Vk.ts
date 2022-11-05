import { Api } from './Api'
import { VK_URl } from '../../config'
import { Request } from '../../types/TRequest'

export class VkRequest implements Request.Vk.Api {
  private readonly token: string
  private readonly api: Api = new Api(VK_URl)
  private readonly apiVersion = '5.131'

  constructor(token: string) {
    this.token = token
  }

  async getPosts(groupId: string) {
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
}
