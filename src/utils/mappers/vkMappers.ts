import moment from 'moment'
import { toString } from 'lodash'

import { Request } from '../../types/TRequest'
import { VkPost, VkPostStats } from '../../types/TVkApi'

export const mapVkPosts = (posts: Request.Vk.Posts.GetPosts.Wall.Item[]): VkPost[] =>
  posts.map((post) => ({
    id: toString(post.id),
    ownerId: toString(post.owner_id),
    fromId: toString(post.from_id),
    date: moment(post.date).format('YYYY-MM-DD'),
  }))

export const mapVkPostStats = (postsStats: Request.Vk.Stats.Post.PostStat[]): VkPostStats[] =>
  postsStats.map((stats) => ({
    postId: stats.post_id,
    hide: stats.hide,
    joinGroup: stats.join_group,
    links: stats.links,
    reachSubscribers: stats.reach_subscribers,
    reachTotal: stats.reach_total,
    reachViral: stats.reach_viral,
    reachAds: stats.reach_ads,
    report: stats.report,
    toGroup: stats.to_group,
    unsubscribe: stats.unsubscribe,
  }))
