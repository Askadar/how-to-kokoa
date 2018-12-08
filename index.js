const Koa = require('koa');
const Router = require('koa-router');
const BP = require('koa-bodyparser');

const url = require('url');

let app = new Koa();

let api = new Router({
	prefix: '/api/v0'
});

api.use(BP());

let titles = [{
	name: 'Steins Gate',
	date_aired: 'SOME MOMENT BS',
	episodes: [{
		video_iframe: 'https://smotret-anime.ru/catalog/steins-gate-914/1-seriya-41100/angliyskie-subtitry-1647681',
		name: '01 - X',
		number: 1,
		date_aired: 'SOME MOMENT BS',
		uploaded_by: 0,
	}],
	voicers: [
		1
	]
}];

let users = [{
	name: 'Pipik',
	role: 'supa-pupa',
	_accessLevel: 99,
},{
	name: 'Nyar',
	role: 'voicer',
	_accessLevel: 3,
	social: {
		vk: 'https://vk.com/nyanyar'
	}
}]

api.use(async (ctx, next) => {
	await next();
	ctx.body = JSON.stringify(ctx.body, null, 2);
})

api.get('/title', async (ctx, next) => {
	ctx.body = titles;
})

api.get('/title/:id', async (ctx, next) => {
	let title = titles[ctx.params.id];
	if (title)
		ctx.body = title;
})

api.post('/title', async (ctx, next) => {
	let data = ctx.request.body;
	if (data.name !== '') {
		titles.push(data);
		ctx.body = titles.slice(-1)[0];
	}
})

api.get('/user', async (ctx, next) => {
	ctx.body = users;
})

api.get('/user/:id', async (ctx, next) => {
	let user = users[ctx.params.id];
	if (user)
		ctx.body = user;
})

api.post('/user', async (ctx, next) => {
	let data = ctx.request.body;
	if (data.name !== '') {
		users.push({
			...data,
			_accessLevel: -1,
		});
		ctx.body = users.slice(-1)[0];
	}
	await next();
})


api.get('/', async (ctx, next) => {
	ctx.body = {
		'what would we return?': false
	}
});


// console.log(api)
app
	.use(api.routes())
	.use(api.allowedMethods())

app.listen(80);
