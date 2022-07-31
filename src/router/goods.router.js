const Router = require("koa-router");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { goodsVerify } = require("../middleware/goods.middleware");

const { upload, create, updata } = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

router.post("/upload", auth, hasAdminPermission, upload);

router.post("/", auth, hasAdminPermission, goodsVerify, create);

router.put("/:id", auth, hasAdminPermission, updata);

module.exports = router;
