const Router = require("koa-router");

const router = new Router({ prefix: "/carts" });

const { auth } = require("../middleware/auth.middleware");

const { validator } = require("../middleware/carts.middleware");

const {
  add,
  findAll,
  updata,
  remove,
  selectAll,
  notSelectAll,
} = require("../controller/carts.controller");

// 添加购物车
router.post(
  "/",
  auth,
  validator({
    goods_id: "number",
  }),
  add
);

// 查询购物车
router.get("/", auth, findAll);

// 更新购物车
router.patch(
  "/:id",
  auth,
  validator({
    number: "number",
    selected: "bool",
  }),
  updata
);

// 删除购物车
router.delete(
  "/",
  auth,
  validator({
    ids: "array",
  }),
  remove
);

// 全部选中
router.post("/selectAll", auth, selectAll);

// 全部取消勾选
router.post("/notSelectAll", auth, notSelectAll);

module.exports = router;
