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
}

module.exports = new GoodsListService();
