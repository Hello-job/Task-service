const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 商品表模型
const GoodsList = seq.define("goods_list", {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品名称",
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "商品价格",
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品数量",
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品图片",
  },
});

// GoodsList.sync({ force: true });

module.exports = GoodsList;
