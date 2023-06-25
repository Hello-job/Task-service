const Router = require('koa-router')

const {
  createSessioId,
  getChatRecord
} = require('../controller/chatRecord.controller')

const { auth } = require('../middleware/auth.middleware')

const router = new Router()

// 创建会话id
router.post('/createSessionId', auth, createSessioId)

// 获取会话记录
router.post('/getSessionRecord', auth, getChatRecord)

module.exports = router
