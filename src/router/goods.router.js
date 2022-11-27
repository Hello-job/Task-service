const Router = require("koa-router");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { goodsVerify } = require("../middleware/goods.middleware");

const {
  upload,
  create,
  updata,
  remove,
  findAll,
} = require("../controller/goods.controller");

const router = new Router();

// 上传图片接口
router.post("/goods/upload", auth, hasAdminPermission, upload);

// 添加商品接口
router.post("/goods/", auth, hasAdminPermission, goodsVerify, create);

// 更新商品接口
router.put("/goods/:id", auth, hasAdminPermission, updata);

// 下架商品
router.post("/goods/:id/off", auth, hasAdminPermission, remove);

// 获取商品列表
router.get("/", findAll);
module.exports = router;
