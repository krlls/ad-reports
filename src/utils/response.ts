import { RouterContext } from 'koa-router'

export const respond200 = (ctx: RouterContext) => {
  ctx.status = 200
  ctx.body = ''
}

export const respond204 = <A extends string, B>(ctx: RouterContext, body?: Record<A, B>) => {
  ctx.status = 204
  ctx.body = body || ''
}

export const respond200json = <A extends string, B>(ctx: RouterContext, body?: Record<A, B>) => {
  ctx.type = 'json'
  ctx.body = body
}

export const respond200plain = (ctx: RouterContext, body: string) => {
  ctx.type = 'text/plain'
  ctx.body = body
}

export const respond403 = <A extends string, B>(ctx: RouterContext, body?: Record<A, B> | string) => {
  ctx.status = 403
  ctx.body = body || ''
}

export const respond400 = <A extends string, B>(ctx: RouterContext, body?: Record<A, B> | string) => {
  ctx.status = 400
  ctx.body = body || ''
}

export const respond409 = <A extends string, B>(ctx: RouterContext, body?: Record<A, B> | string) => {
  ctx.status = 409
  ctx.body = body || ''
}

export const respond401 = (ctx: RouterContext) => {
  ctx.status = 401
  ctx.body = ''
}

export const respond404 = (ctx: RouterContext, body?: string) => {
  ctx.status = 404
  ctx.body = body || ''
}

export const respond500 = (ctx: RouterContext) => {
  ctx.status = 500
  ctx.body = ''
}
