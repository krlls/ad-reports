import { Request } from './TRequest'

export abstract class VkImport {
  abstract api: Request.Vk.Api
  abstract posts(groupId: string): Promise<VkPost[]>
  abstract postsStats(groupId: string, postId: string | string[]): Promise<VkPostStats[]>
}

export interface VkPost {
  id: string,
  fromId: string,
  ownerId: string,
  date: string,
}

export type VkPostStats = {
  postId: number,
  hide: number,
  joinGroup: number,
  links: number,
  reachSubscribers: number,
  reachTotal: number,
  reachViral: number,
  reachAds: number,
  report: number,
  toGroup: number,
  unsubscribe: number,
}
