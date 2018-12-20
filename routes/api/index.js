const Router = require('koa-router')
const BP = require('koa-bodyparser')

const user = require('./v0/user')
const title = require('./v0/title')

let api = new Router({
	prefix: '/api/v0'
})

api.use(BP())
api.use(async (ctx, next) => {
	await next()
	ctx.body = JSON.stringify(ctx.body, null, 2)
})

api.use(user.routes())
api.use(user.allowedMethods())

api.use(title.routes())
api.use(title.allowedMethods())

module.exports = api
