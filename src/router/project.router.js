const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')

const { create } = require('../controller/project.controller')

const router = new Router()

// 上传图片接口
router.post('/project', auth, create)

module.exports = router
