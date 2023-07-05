const { DataTypes } = require('sequelize')

const User = require('./user.module')

const seq = require('../db/seq')

// 创建数据表模型
const Project = seq.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '项目id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '项目名称'
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '创建人'
  },
  projectImg: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '项目封面'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '项目描述'
  }
})

// Project.sync({ alter: true })

Project.belongsTo(User, { foreignKey: 'creator', as: 'creatorInfo' })

module.exports = Project
