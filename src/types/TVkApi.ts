import { Request } from './TRequest'

export abstract class VkImport {
  abstract api: Request.Vk.Api
  abstract posts(groupId: string): Promise<VkPost[]>
  // abstract postsStats(groupId: string): any
}

export interface VkPost {
  id: string,
  fromId: string,
  ownerId: string,
  date: string,
}
