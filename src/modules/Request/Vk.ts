import { Api } from './Api'
import { VK_TOKEN, VK_URl } from '../../config'
import { Request } from '../../types/TRequest'

export class VkRequest {
  private static api: Api = new Api(VK_URl)

  static getPosts = (groupId: string) => {
    return this.api.req<Request.Posts.GetPosts.Params, Request.Posts.GetPosts.Resp>({
      method: Request.Posts.GetPosts.METHOD,
      url: Request.Posts.GetPosts.URL,
      params: {
        access_token: VK_TOKEN,
        owner_id: groupId,
        v: '5.131',
      },
    })
  }
}
