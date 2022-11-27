const Router = require("koa-router");

const router = new Router({ prefix: "/addr" });

const { auth } = require("../middleware/auth.middleware");

const { validator } = require("../middleware/addr.moduleware");

router.post(
  "/",
  validator({
    consignee: "string",
    phone: {
      type: "number",
      format: /^1\d{10}$/,
    },
    address: "string",
  }),
  (ctx) => {
    ctx.body = "天啊及成功";
  }
);

module.exports = router;
