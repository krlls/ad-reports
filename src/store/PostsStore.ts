import { Posts } from '../types'

const DB: Posts.Post[] = [
  { id: 0, title: 'Test title', data: 'text...' },
  { id: 2, title: 'Test title', data: 'text...' },
  { id: 3, title: 'Test title', data: 'text...' },
]

export class PostsStore {
  static findPost(id: number) {
    return DB[id]
  }
}
