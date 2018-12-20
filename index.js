const Koa = require('koa')

const router = require('./routes')
let app = new Koa()

app
	.use(router.routes())
	// .use(router.allowedMethods())

const PORT = process.env.ANI_PORT || 80

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
