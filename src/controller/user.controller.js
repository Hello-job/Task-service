const {
  createUser,
  getUserInfo,
  updataUserinfo,
  userAll
} = require('../service/user.service')

const { userRequestErr, updataPswErr } = require('../constant/use.constant')

const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.defaule')
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body

    try {
      const res = await createUser(user_name, password)
      ctx.body = {
        code: 0,
        message: '注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      }
    } catch (err) {
      ctx.app.emit('error', userRequestErr, ctx)
      return
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body

    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          userInfo: { ...res }
        }
      }
    } catch (err) {}
  }

  /**
   *
   * @param { } ctx
   * @param {*} next
   * @returns
   */
  async userInfo(ctx, next) {
    const { id } = ctx.request.query
    const user = await getUserInfo({ id, type: 'get' })

    if (user) {
      ctx.body = {
        code: 0,
        message: '',
        result: {
          user
        }
      }
    }
  }

  async updataPaw(ctx, next) {
    const { password, id } = ctx.request.body

    try {
      const res = await updataUserinfo({ id, password })
      if (!res) {
        ctx.body = {
          code: 0,
          message: '修改密码成功',
          result: ''
        }
      }
    } catch (err) {
      ctx.app.emit('error', updataPswErr, ctx)
      return
    }
  }

  async upUserInfo(ctx, next) {
    const updateInfo = ctx.request.body
    try {
      const res = await updataUserinfo(updateInfo)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改信息成功',
          result: ''
        }
      }
    } catch (err) {
      ctx.app.emit('error', updataPswErr, ctx)
      return
    }
  }

  /**
   * 获取全部用户
   */
  async getUserAll(ctx, next) {
    const res = await userAll()
    ctx.body = {
      code: 0,
      message: '',
      result: {
        userList: res
      }
    }
  }
}

module.exports = new UserController()
