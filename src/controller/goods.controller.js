const path = require("path");

const { createGoods, updataGoods } = require("../service/goods.service");
const { uploadError, createGoodsError } = require("../constant/goods.constant");

class GoodsController {
  async upload(ctx, next) {
    const file = ctx.request.files;
    console.log("filefile", file);
    if (file) {
      ctx.body = {
        code: 0,
        message: "上传图片成功",
        result: {
          goods_path: path.basename(file.name),
        },
      };
    } else {
      ctx.app.emit("error", uploadError, ctx);
      return;
    }
    next();
  }

  async create(ctx, next) {
    const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body;
    try {
      const res = await createGoods(
        goods_name,
        goods_price,
        goods_num,
        goods_img
      );
      if (res) {
        ctx.body = {
          code: 0,
          message: "添加商品成功",
          result: res,
        };
      }
    } catch (err) {
      return ctx.app.emit("error", createGoodsError, ctx);
    }
    next();
  }

  async updata(ctx, next) {
    try {
      const res = await updataGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改成功",
          result: res,
        };
      }
    } catch (err) {}
    next();
  }
}

module.exports = new GoodsController();
