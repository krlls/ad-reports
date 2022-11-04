import * as Joi from '@hapi/joi'

export const postsListReq = Joi.object({
  id: Joi.number().integer().max(2).required(),
})
