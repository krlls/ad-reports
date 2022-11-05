import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ReqApiLogger } from '../Logger'

interface CustomConfig<Req> extends AxiosRequestConfig<Req> {
  params?: Req,
}

export class Api {
  readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  req<Req = any, Resp = any>(restConfig: CustomConfig<Req>, token?: string) {
    return axios
      .create({
        baseURL: this.baseUrl,
        headers: {
          Accept: '*/*',
          ...(token && { Authorization: 'Token ' + token }),
        },
      })(restConfig)
      .then((response: AxiosResponse<Resp>) => {
        ;(response.data as any)?.error
          ? ReqApiLogger.error(response.data)
          : ReqApiLogger.info('Success', `status ${response.status}`)

        if (response.data) {
          return response.data
        }

        return undefined
      })
      .catch((e: AxiosError) => {
        ReqApiLogger.error(e.response?.status, e.response?.statusText)
        return undefined
      })
  }
}
