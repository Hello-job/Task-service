const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.defaule')

const { tokenExpiredError, invalidTokenErr } = require('../constant/use.constant')

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header

    const token = authorization.replace('Bearer ', '')

    try {
        const user = await jwt.verify(token, JWT_SECRET);
        ctx.state.user = user
    } catch (err) {
        switch(err.name) {
            case 'TokenExpiredError':
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                return ctx.app.emit('error', invalidTokenErr, ctx)
        }
    }
    await next()
}

module.exports = {
    auth
}