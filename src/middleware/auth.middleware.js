const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const { JWT_SECRET } = require("../config/config.defaule");

const {
  tokenExpiredError,
  invalidTokenErr,
} = require("../constant/use.constant");

const { hasAdminPermissionError } = require("../constant/goods.constant");

const { formatDataTime } = require("../core/utils");

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = await jwt.verify(token, JWT_SECRET);
    formatDataTime(user, "YYYY-MM-DD HH:mm:ss", ["createdAt", "updatedAt"]);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        return ctx.app.emit("error", invalidTokenErr, ctx);
    }
  }
  await next();
};

const hasAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    return ctx.app.emit("error", hasAdminPermissionError, ctx);
  }
  next();
};

module.exports = {
  auth,
  hasAdminPermission,
};
