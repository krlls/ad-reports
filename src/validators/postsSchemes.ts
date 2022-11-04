import * as Joi from '@hapi/joi'

export const saveTokenReq = Joi.object({
  access_token: Joi.string().required(),
  expires_in: Joi.number(),
  user_id: Joi.number(),
})
