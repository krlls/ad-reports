import { isArray } from 'lodash'

import { VkImport, VkPost } from '../../types/TVkApi'
import { mapVkPosts } from '../../utils/mappers/vkMappers'
import { Request } from '../../types/TRequest'

export class VkImporter implements VkImport {
  api: Request.Vk.Api

  constructor(api: Request.Vk.Api) {
    this.api = api
  }

  async posts(groupId: string): Promise<VkPost[]> {
    const posts = await this.api.getPosts(groupId)

    if (!posts || !isArray(posts?.response?.items)) {
      return []
    }

    return mapVkPosts(posts.response.items || [])
  }
}
