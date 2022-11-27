const GoodsList = require("../module/goods.module");

class GoodsListService {
  async createGoods(goods_name, goods_price, goods_num, goods_img) {
    try {
      const res = await GoodsList.create({
        goods_name,
        goods_price,
        goods_num,
        goods_img,
      });

      return res.dataValues;
    } catch (err) {}
  }
  async updataGoods(id, params) {
    try {
      const res = await GoodsList.update(params, {
        where: { id },
      });
      return res.dataValues;
    } catch (err) {
      console.log(err);
    }
  }

  // 下架商品
  async removeGoods(id) {
    try {
      const res = await GoodsList.destroy({
        where: {
          id,
        },
      });
      console.log(">>>>>resres", res);
      return res;
    } catch (err) {
      console.log(">>>>err", err);
    }
  }

  // 获取全部的商品
  async findAllGoods(pageNum, pageSize) {
    try {
      const offset = (pageNum - 1) * pageSize;
      const { count, rows } = await GoodsList.findAndCountAll({
        offset,
        limit: pageSize * 1,
      });
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    } catch (err) {
    }
  }
}

module.exports = new GoodsListService();
