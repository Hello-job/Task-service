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
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    ctx.status = 400;
    ctx.app.emit("error", useFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (await getUserInfo({ user_name })) {
    ctx.status = 409;
    ctx.app.emit("error", userAlreadyExited, ctx);
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
  const { user_name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });

    if (!res) {
      ctx.app.emit("error", userDoesNotexist, ctx);
      return;
    }
    if (password != res.password) {
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
