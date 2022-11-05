import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ApiLogger } from '../Logger'

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
        ApiLogger.info('Success', `status ${response.status}`)
        if (response.data) {
          return response.data
        }

        return undefined
      })
      .catch((e: AxiosError) => {
        ApiLogger.error(e.response?.status, e.response?.statusText)
        return undefined
      })
  }
}
