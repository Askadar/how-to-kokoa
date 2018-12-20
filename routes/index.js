const Router = require('koa-router')

const publicRoutes = require('./public')
const api = require('./api')

let routes = new Router()

routes.use(publicRoutes.routes())
routes.use(publicRoutes.allowedMethods())

routes.use(api.routes())
routes.use(api.allowedMethods())

module.exports = routes
