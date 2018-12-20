const Router = require('koa-router')

const Title = require('../../../model/title')

let api = new Router()

api.get('/title', async ctx => {
	ctx.body = await Title.find()
})

api.get('/title/:id', async ctx => {
	let title = await Title.findOne(ctx.params.id)
	if (title)
		ctx.body = title
})

api.post('/title', async ctx => {
	let data = ctx.request.body
	let title = await Title.insertOne(data)
	ctx.body = title
})

api.post('/title/:title/:episode', async ctx => {
	let data = ctx.request.body
	let title = await Title.upsertEpisode(ctx.params.title, ctx.params.episode, data)
	ctx.body = title
})

module.exports = api
