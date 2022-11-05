import * as dotenv from 'dotenv'

dotenv.config()

export const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || ''
export const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
export const SHEET_ID = process.env.SHEET_ID || ''

export const VK_TOKEN = process.env.VK_TOKEN || 'testToken'
export const VK_APP_ID = process.env.VK_APP_ID || '123456'
export const VK_AUTH_LINK =
  process.env.VK_AUTH_LINK ||
  `https://oauth.vk.com/authorize?client_id=${VK_APP_ID}
&display=page
&redirect_uri=http://localhost:3000/vk/token/
&scope=wall,stats,groups,offline
&response_type=token
&v=5.131
`
