import { isArray } from 'lodash'

import { VkImport } from '../../types/TVkApi'
import { mapVkPosts, mapVkPostStats } from '../../utils/mappers/vkMappers'
import { Request } from '../../types/TRequest'

export class VkImporter implements VkImport {
  api: Request.Vk.Api

  constructor(api: Request.Vk.Api) {
    this.api = api
  }

  async posts(groupId: string) {
    const posts = await this.api.getPosts(groupId)

    if (!posts || !isArray(posts?.response?.items)) {
      return []
    }

    return mapVkPosts(posts.response.items || [])
  }

  async postsStats(groupId: string, postId: string | string[]) {
    const stats = await this.api.getPostStats(groupId, postId)

    if (!stats || !isArray(stats.response)) {
      return []
    }

    return mapVkPostStats(stats.response)
  }
}
