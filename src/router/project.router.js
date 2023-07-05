const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')

const { create, projectList } = require('../controller/project.controller')

const router = new Router()

// 创建项目
router.post('/createProject', auth, create);

// 获取用户项目列表
router.get('/projectList', auth, projectList);

module.exports = router
