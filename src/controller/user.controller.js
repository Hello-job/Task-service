const { createUser } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        console.log( ctx.request.body)
        const { user_name, password } = ctx.request.body
        
        const res = await createUser(user_name, password)
        console.log(res)
        console.log(ctx.request.body)
        ctx.body = ctx.request.body
    }
}

module.exports = new UserController()