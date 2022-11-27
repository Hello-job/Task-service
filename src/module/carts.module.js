const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const GoodsList = require("./goods.module");

const Cart = seq.define("zd_cart", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品的id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户的id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});

Cart.belongsTo(GoodsList, {
  foreignKey: "id",
  as: "goods_info",
});

// Cart.sync();

module.exports = Cart;
