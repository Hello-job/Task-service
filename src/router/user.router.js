const Router = require('koa-router')

const { useValidator, verifyUser } = require('../middleware/use.middleware')

const { register} = require('../controller/user.controller')

const router = new Router({prefix: '/user'})

router.post('/', useValidator, verifyUser, register)


module.exports = router