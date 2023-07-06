const { getUserInfo } = require("../service/user.service");

const {
  useFormateError,
  userAlreadyExited,
  userRequestErr,
  userDoesNotexist,
  userLoginErr,
  invalidPassword,
} = require("../constant/use.constant");

const bcrypt = require("bcryptjs");

const useValidator = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 合法性
  if (!name || !password) {
    ctx.status = 400;
    ctx.app.emit("error", useFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 合法性
  if (await getUserInfo({ name })) {
    ctx.body = {
      code: 0,
      message: "用户已存在",
    };
    // ctx.app.emit("error", userAlreadyExited, ctx);
    return;
  }

  await next();
};

const encryptionPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash;

    await next();
  } catch (e) {
    ctx.app.emit("error", userRequestErr, ctx);
    await next();
  }
};

const verifyLogin = async (ctx, next) => {
  // 判断用户是否存在
  const { name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ name, getType: true });
    if (!res) {
      ctx.app.emit("error", userDoesNotexist, ctx);
      return;
    }
    // 解密
    const isOk = bcrypt.compareSync(password, res.password);

    if (!isOk) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (err) {
    ctx.app.emit("error", userLoginErr, ctx);
    return;
  }

  // 密码是否匹配

  await next();
};

module.exports = {
  useValidator,
  verifyUser,
  encryptionPassword,
  verifyLogin,
};
