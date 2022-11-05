export interface IVKReport {
  generatePostReport(): Promise<boolean>,
}

export interface VKPostReport {
  postId: string,
  fromId: string,
  ownerId: string,
  date: string,
  reposts: number,
  likes: number,
  comments: number,
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
