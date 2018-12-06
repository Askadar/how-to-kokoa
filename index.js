const Koa = require('koa');
// const Router = require('koa-router');

const url = require('url');

let app = new Koa();

app.use(async (ctx, next) => {
	console.log('in');
	const promise = new Promise(resolve =>
		console.log('Started promise') ||
			setTimeout(() =>
				console.log('Finished promise') || resolve(true), 1000
			)
	)
	await next();
	ctx.body = 'Flushed: ' + await promise;
	console.log('out');
})

app.use(async (ctx, next) => {
	console.log('setting body');
	ctx.body = require('util').inspect(ctx.req)
	await next()
	console.log('out second')
})

app.listen(80);
