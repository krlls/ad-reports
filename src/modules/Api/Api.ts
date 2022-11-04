import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export class Api {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  req<Resp = any>(restConfig: AxiosRequestConfig, token?: string) {
    return axios
      .create({
        baseURL: this.baseUrl,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          ...(token && { Authorization: 'Token ' + token }),
        },
      })(restConfig)
      .then((response: AxiosResponse<Resp>) => {
        if (response.data) {
          return response.data
        }

        return
      })
      .catch((e: AxiosError) => {
        // eslint-disable-next-line no-console
        console.warn('[App Api] Error:', e.response?.status, e.response?.statusText)
        return
      })
  }
}
