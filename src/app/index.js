const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');

const errHandle = require('./errHandler')

const userRouter = require('../router/user.router')

app.use(koaBody());

app.use(userRouter.routes())
app.on('error', errHandle)

module.exports = app