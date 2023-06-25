const Router = require('koa-router')

const {
  useValidator,
  verifyUser,
  encryptionPassword,
  verifyLogin
} = require('../middleware/use.middleware')

const { auth } = require('../middleware/auth.middleware')

const {
  register,
  login,
  updataPaw,
  upUserInfo,
  userInfo,
  getUserAll
} = require('../controller/user.controller')

const { upload } = require('../controller/goods.controller')
const { getUserInfo } = require('../service/user.service')

const router = new Router()

// 注册账号
router.post('/register', useValidator, verifyUser, encryptionPassword, register)

// 用户登陆
router.post('/login', useValidator, verifyLogin, login)

// 用户信息
router.get('/userinfo', auth, userInfo)

// 重新设置密码
router.patch('/updataPassword', auth, updataPaw)

// 更新用户信息
router.post('/updateUserInfo', auth, upUserInfo)

// 文件上传
router.post('/upload', auth, upload)

// 获取全部用户信息
router.get('/getUserAll', auth, getUserAll)

module.exports = router
