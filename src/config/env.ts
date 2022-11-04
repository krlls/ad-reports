import * as dotenv from 'dotenv'

dotenv.config()

export const VK_TOKEN = process.env.VK_TOKEN || 'testToken'
export const VK_APP_ID = process.env.VK_APP_ID || '123456'
export const VK_AUTH_LINK =
  process.env.VK_AUTH_LINK ||
  `https://oauth.vk.com/authorize?client_id=${VK_APP_ID}
&display=page
&redirect_uri=http://vk.com/
&scope=stats,groups
&response_type=token
&v=5.131
`
