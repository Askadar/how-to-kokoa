const Router = require('koa-router')

const user = require('./user')
const title = require('./title')

let publicR = new Router()

publicR.use(user.routes())
publicR.use(user.allowedMethods())

publicR.use(title.routes())
publicR.use(title.allowedMethods())

module.exports = publicR
