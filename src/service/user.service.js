const User = require('../module/use.module')
class UserService {
  async createUser(user_name, password) {
    try {
      const res = await User.create({ user_name, password })
      return res.dataValues
    } catch (err) {}
  }
  async getUserInfo({ id, user_name, password, is_admin, type }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })
    let attributes = [
      'id',
      'user_name',
      'password',
      'is_admin',
      'avatar',
      'createdAt',
      'updatedAt'
    ]
    if (type === 'get') {
      attributes = attributes.filter(key => key !== 'password')
    }
    const res = await User.findOne({
      attributes,
      where: whereOpt
    })
    return res ? res.dataValues : null
  }

  async updataUserinfo({ id, user_name, password, is_admin, avatar }) {
    try {
      const whereOpt = { id }
      const newOpt = {}
      user_name && Object.assign(newOpt, { user_name })
      password && Object.assign(newOpt, { password })
      is_admin && Object.assign(newOpt, { is_admin })
      avatar && Object.assign(newOpt, { avatar })
      const res = await User.update(newOpt, {
        where: whereOpt
      })
      return res
    } catch (err) {}
  }

  /**
   * 获取去全部用户
   *
   */
  async userAll() {
    console.log('res')

    let attributes = [
      'id',
      'user_name',
      'is_admin',
      'avatar',
      'createdAt',
      'updatedAt'
    ]

    const res = await User.findAll({
      attributes
    })
    return res
  }
}

module.exports = new UserService()
