import { AnySchema } from '@hapi/joi'

export const validate = (scheme: AnySchema, data: any) => {
  return scheme.validate(data).error
}
