const Router = require('koa-router')

const User = require('../../../model/user')

let api = new Router()

api.get('/user', async ctx => {
	ctx.body = await User.find()
})

api.get('/user/:id', async ctx => {
	let user = await User.findOne(ctx.params.id)
	if (user)
		ctx.body = user
})

api.post('/user', async ctx => {
	let data = ctx.request.body
	let user = await User.insertOne(data)
	ctx.body = user
})

module.exports = api
