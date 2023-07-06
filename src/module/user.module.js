const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建数据表模型
const User = seq.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名，唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员，0: 不是管理员（默认）：1： 是管理员",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "用户头像",
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "纯色图像",
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "手机号",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "邮箱",
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "描述信息",
  },
});

// User.sync({ alter: true });

module.exports = User;
