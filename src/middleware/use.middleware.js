const { getUserInfo } = require('../service/user.service')

const { useFormateError, } = require('../constant/use.constant')

const useValidator = async  (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 合法性
    if (!user_name || !password) {
        ctx.status = 400
        ctx.app.emit('error', useFormateError, ctx)
        return 
    }
    await next()
}

const verifyUser = async  (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 合法性
    if (await getUserInfo({user_name})) {
        ctx.status = 409
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }

    await next()
}


module.exports = {
    useValidator,
    verifyUser
}