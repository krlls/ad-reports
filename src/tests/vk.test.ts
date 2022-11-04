import { expect, test, describe } from '@jest/globals'

import { Api } from '../types/TApi'
import { createPatch } from '../utils/links'
import { TestApp } from './index.test'

describe('VK tests', () => {
  const vkPatch: (...args: string[]) => string = createPatch.bind(null, Api.Vk.PREFIX)

  test('Get link works', async () => {
    const response = await TestApp.get(vkPatch(Api.Vk.AuthLink.URL))

    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
  })

  test('Save token', async () => {
    const response = await TestApp.get(vkPatch(Api.Vk.SaveToken.URL)).query({
      access_token: '533bacf01e11f55b536a565b57531ad114461ae8736d6506a3',
      expires_in: 9479238,
      user_id: 234,
    })

    expect(response.status).toBe(200)
  })
})
