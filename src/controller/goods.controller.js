const path = require("path");

const {
  createGoods,
  updataGoods,
  removeGoods,
  findAllGoods,
} = require("../service/goods.service");
const { uploadError, createGoodsError } = require("../constant/goods.constant");

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
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
          message: "上传图片成功",
          result: {
            goods_path: path.basename(file.name),
          },
        };
      } else {
        ctx.app.emit("error", uploadError, ctx);
        return;
      }
    } catch (err) {
      return ctx.app.emit("error", createGoodsError, ctx);
    }
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
  }

  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id);

      if (res) {
        ctx.body = {
          code: 0,
          message: "下架商品成功",
          result: "",
        };
      } else {
        ctx.body = {
          code: 0,
          message: "该商品已经下架",
          result: "",
        };
      }
    } catch (err) {
      console.log(">>>>err", err);
    }
  }

  async findAll(ctx, next) {
    try {
      const { pageNum = 1, pageSize = 10 } = ctx.request.query;

      const res = await findAllGoods(pageNum, pageSize);
      if (res) {
        ctx.body = {
          code: 0,
          message: "获取商品成功",
          result: res,
        };
      }
    } catch (err) {
      console.log(">>>>>err", err);
    }
  }
}

module.exports = new GoodsController();
