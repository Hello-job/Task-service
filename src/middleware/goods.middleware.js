const { verifyFormError } = require("../constant/goods.constant");

const goodsVerify = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {
        type: "string",
        required: true,
      },
    });
  } catch (err) {
    verifyFormError.result = err;
    return ctx.app.emit("error", verifyFormError, ctx);
  }
  next();
};

module.exports = {
  goodsVerify,
};
