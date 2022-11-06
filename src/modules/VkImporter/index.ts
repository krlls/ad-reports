import { flatten, isArray } from 'lodash'

import { VkImport } from '../../types/TVkImport'
import { mapVkPosts, mapVkPostStats } from '../../utils/mappers/vkMappers'
import { Request } from '../../types/TRequest'
import { chunkRequest } from '../../utils/request'

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
    const postIds = isArray(postId) ? postId : [postId]
    const statsData = await chunkRequest((posts) => this.api.getPostStats(groupId, posts), postIds, 30)
    const stats = flatten(
      statsData.filter((s) => !!s).map((s) => (s as NonNullable<Request.Vk.Stats.Post.Resp>).response),
    )

    if (!stats || !isArray(stats)) {
      return []
    }

    return mapVkPostStats(stats)
  }
}
