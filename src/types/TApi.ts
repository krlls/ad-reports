import { IVkApi } from './TVkImport'

export namespace Api {
  export namespace Vk {
    export const PREFIX = '/vk'

    export namespace AuthLink {
      export const URL = '/auth'
    }

    export namespace SaveToken {
      export const URL = '/token'

      export type Req = {
        access_token: string,
        expires_in: string,
        user_id: string,
      }
    }

    export namespace Posts {
      export const URL = '/posts'

      export type Req = {
        groupId: number,
      }

      export type Resp = IVkApi.Wall.Response
    }
  }
}
