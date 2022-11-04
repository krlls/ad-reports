import * as request from 'supertest'

import { App } from '../modules/App'

export const TestApp = request(App.callback())

test('Hello world works', async () => {
  const response = await TestApp.get('/')

  expect(response.status).toBe(200)
  expect(response.text).toBe('🔥 Hello world!')
})
