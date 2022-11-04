import { IVkApi } from './TVkImport'

export namespace Request {
  export interface BaseParams {
    access_token: string,
    v: string,
  }

  export namespace Posts {
    export namespace GetPosts {
      export const URL = 'wall.get'
      export const METHOD = 'GET'

      export enum EFilter {
        SUGGESTS = 'suggests',
        POSTPONED = 'postponed',
        OWNER = 'owner',
        OTHERS = 'others',
        ALL = 'all',
      }

      export interface Params extends BaseParams {
        owner_id: string,
        filter?: EFilter,
        domain?: string,
        offset?: number,
        count?: number,
      }

      export type Resp = {
        response: IVkApi.Wall.Response,
      }
    }
  }
}
