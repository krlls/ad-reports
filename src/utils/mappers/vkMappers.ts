import moment from 'moment'
import { toString } from 'lodash'

import { Request } from '../../types/TRequest'
import { VkPost, VkPostStats } from '../../types/TVkImport'
import { VKPostReport } from '../../types/TVkReport'
import { REPORT_TIME_FORMAT } from '../../config'

export const mapVkPosts = (posts: Request.Vk.Posts.GetPosts.Wall.Item[]): VkPost[] => {
  return posts.map((post) => ({
    id: toString(post.id),
    ownerId: toString(post.owner_id),
    fromId: toString(post.from_id),
    date: moment.unix(post.date).format(REPORT_TIME_FORMAT),
    likes: post.likes?.count || 0,
    reposts: post.reposts?.count || 0,
    comments: post.comments?.count || 0,
  }))
}

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

export const createVkReport = (posts: Map<string, VkPost>, postStats: VkPostStats[]): VKPostReport[] => {
  return postStats.map((stats) => {
    const post = posts.get(stats.postId + '')

    return {
      postId: post?.id || stats.postId + '',
      fromId: post?.fromId || '',
      ownerId: post?.ownerId || '',
      date: post?.date || '',
      reposts: post?.reposts || 0,
      likes: post?.likes || 0,
      comments: post?.comments || 0,
      hide: stats.hide,
      joinGroup: stats.joinGroup,
      links: stats.links,
      reachSubscribers: stats.reachSubscribers,
      reachTotal: stats.reachTotal,
      reachViral: stats.reachViral,
      reachAds: stats.reachAds,
      report: stats.report,
      toGroup: stats.toGroup,
      unsubscribe: stats.unsubscribe,
    }
  })
}

export const vkReportsToRows = (reports: VKPostReport[]): Array<(string | number)[]> =>
  reports.map((r) => [r.postId, r.date, r.reachTotal, r.likes, r.reposts, r.links, r.comments])
