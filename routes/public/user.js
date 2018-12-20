const Router = require('koa-router')
const User = require('../../model/user')

let user = new Router()

user.get('/user', async ctx => {
	ctx.body = `
		<!DOCTYPE html>
		<html lang="en">
			<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>Document</title>
			</head>
			<body>
				<ul className="users">
					${(await User.find()).map(user => `<li>${user.name}: ${user.role} (${user._id})</li>`).join('')}
				</ul>
				<form action="/api/v0/user" method="post">
					<p>User</p>
					<p>
						<label>
							Name: <input type="text" name="name" required/>
						</label>
					</p>
					<p>
						<label>
							Role: <select type="text" name="role">
								${User.roles.map((a, i) => `<option
									value="${a}"
									${i === User.roles.length - 1&& 'selected'}
								>${a}</option>`)}
							</select>
						</label>
					</p>
					<p>
						<label>
							Social: <select type="text" name="social_name">
							<option value="vk">VKontakte</option>
							</select>: <input type="text" name="social_value"/>
						</label>
					</p>
					<p>
						<button type="submit">Fuckemup!</button>
					</p>
				</form>
			</body>
		</html>`
})

module.exports = user
