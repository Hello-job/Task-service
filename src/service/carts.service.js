const { Op } = require("sequelize");
const Cart = require("../module/carts.module");
const GoodsList = require("../module/goods.module");

class cartsService {
  async addCarts(user_id, goods_id) {
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    if (res) {
      await res.increment("number");
      return res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }

  async findAllCart(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ["id", "number"], // 获取表字段
      include: {
        model: GoodsList,
        as: "goods_info",
        attributes: ["id", "goods_name"],
      },
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }

  async updataCart(id, number, selected) {
    const res = await Cart.findByPk(id);
    number !== undefined ? res.number === number : "";
    if (selected !== undefined) {
      res.selected = selected;
    }
    if (!res) return "";
    return await res.save();
  }

  async removeCart(ids) {
    return Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }

  async selectAllCarts(user_id) {
    return Cart.update(
      { selected: true },
      {
        where: {
          user_id,
        },
      }
    );
  }

  async notSelectAll(user_id) {
    return Cart.update(
      { selected: false },
      {
        where: {
          user_id,
        },
      }
    );
  }
}

module.exports = new cartsService();
