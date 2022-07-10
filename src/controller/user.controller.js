const { createUser } = require('../service/user.service')

const {userRequestErr} = require('../constant/use.constant')

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
}

module.exports = new UserController()