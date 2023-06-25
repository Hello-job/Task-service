const { cartsError } = require('../constant/goods.constant')
const validator = rulse => {
  return (ctx, next) => {
    try {
      ctx.verifyParams(rulse)
    } catch (err) {
      console.error('>>>>>err', err)
      cartsError.result = err
      return ctx.app.emit('error', cartsError, ctx)
    }
    next()
  }
}

module.exports = {
  validator
}
