const Router = require('koa-router')
const Title = require('../../model/title')
const User = require('../../model/user')

let title = new Router()

title.get('/title', async ctx => {
	ctx.body = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<title>Title form</title>
			</head>
			<body>
				<ul className="users">
					${(await Title.find().populate('voicers')).map(title => `<li><a href="/title/${title._id}">
						${title.name}: ${title.date_aired} (${title._id}) [${title.voicers}]
					</a></li>`).join('')}
				</ul>
				<form action="/api/v0/title" method="post">
					<p>Title</p>
					<p>
						<label>
							Title name: <input type="text" name="name" required/>
						</label>
					</p>
					<p>
						<label>
							Title name: <input type="date" name="date_aired" required/>
						</label>
					</p>
					<p>
						<label>
							Title voicer: <select type="text" name="voicers">
								${(await User.find({ role: 'voicer' })).map((a) => `<option
									value="${a._id}"
								>${a.name}</option>`)}
							</select>
						</label>
					</p>
					<p>
						<button type="submit">Fuckemup!</button>
					</p>
				</form>
			</body>
		</html>`
})

title.get('/title/:titleId', async ctx => {
	ctx.body = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<title>Title form</title>
			</head>
			<body>
				<ul className="titles">
					${([await Title.findOne(ctx.params.titleId).populate('voicers')]).map(title => `<li>${title.name}: ${title.date_aired} (${title._id}) [${title.voicers}]</li>`).join('')}
				</ul>
				<!--<form action="/api/v0/title" method="post">
					<p>Title's episode</p>
					<p>
						<label>
							Title name: <input type="text" name="name" required/>
						</label>
					</p>
					<p>
						<label>
							Title name: <input type="date" name="date_aired" required/>
						</label>
					</p>
					<p>
						<button type="submit">Fuckemup!</button>
					</p>
				</form>-->
			</body>
		</html>`
})

module.exports = title
