const {
  addCarts,
  findAllCart,
  updataCart,
  removeCart,
  selectAllCarts,
  notSelectAll,
} = require("../service/carts.service");

class CartsController {
  async add(ctx) {
    const { id: user_id } = ctx.state.user;
    const { goods_id } = ctx.request.body;
    const res = await addCarts(user_id, goods_id);
    if (res.daraValues) {
      ctx.body = {
        code: 0,
        message: "添加成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 0,
        message: "添加失败",
        result: "",
      };
    }
  }

  async findAll(ctx) {
    const { pageNum, pageSize } = ctx.request.query;
    const res = await findAllCart(pageNum, pageSize);
    console.log(">>>>>>res", res);
    if (res) {
      ctx.body = {
        code: 0,
        message: "获取购物车成功",
        result: res,
      };
    }
  }

  async updata(ctx) {
    const { id } = ctx.request.params;
    const { number, selected } = ctx.request.body;
    console.log(">>>>>>ctx.request.params", ctx.request.params);
    if (number === undefined || selected === undefined) {
      return (ctx.body = {
        code: 500,
        message: "数量和选中不能全部为零",
        result: "",
      });
    } else {
      const res = await updataCart(id, number, selected);
      ctx.body = {
        code: 0,
        message: "更新成功",
        result: res,
      };
    }
  }

  async remove(ctx) {
    const { ids } = ctx.request.body;

    const res = await removeCart(ids);
    console.log(">>>>>res", res);
    // if (res) {
    ctx.body = {
      code: 0,
      message: "删除购物车成功",
      result: res,
    };
    // }
  }

  async selectAll(ctx, next) {
    const user_id = ctx.state.user.id;
    const res = await selectAllCarts(user_id);

    if (res) {
      ctx.body = {
        code: 0,
        message: "全部选中",
        result: res,
      };
    }
  }
  async notSelectAll(ctx) {
    const user_id = ctx.state.user.id;
    const res = await notSelectAll(user_id);
    if (res) {
      ctx.body = {
        code: 0,
        message: "取消全部候选",
        result: res,
      };
    }
  }
}

module.exports = new CartsController();
