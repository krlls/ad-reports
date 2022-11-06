import { chunk } from 'lodash'

const REQ_DELAY = 500

const delay = (clb: VoidFunction, delay: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      clb()
      resolve(undefined)
    }, delay),
  )

export const chunkRequest = async <A, B>(req: (data: B[]) => A, data: B[], chunkSize: number) => {
  const chunks = chunk(data, chunkSize)
  const requests: A[] = []

  for (const param of chunks) {
    await delay(() => requests.push(req(param)), REQ_DELAY)
  }

  return Promise.all(requests)
}
