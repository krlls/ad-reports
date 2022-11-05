import moment from 'moment'
import { toString } from 'lodash'

import { Request } from '../../types/TRequest'
import { VkPost } from '../../types/TVkApi'

export const mapVkPosts = (posts: Request.Vk.Posts.GetPosts.Wall.Item[]): VkPost[] =>
  posts.map((post) => ({
    id: toString(post.id),
    ownerId: toString(post.owner_id),
    fromId: toString(post.from_id),
    date: moment(post.date),
  }))
