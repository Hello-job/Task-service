const User = require('../module/use.module')
class UserService {
    async createUser(user_name, password) {
        try {
          const res = await User.create({ user_name, password })
          console.log('>>>>>>>res', res.dataValues)
          return  res.dataValues
        } catch(err) {
         
        }
    }
    async getUserInfo({ id, user_name, password, is_admin}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        })
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()