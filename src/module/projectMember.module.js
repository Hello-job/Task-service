const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建数据表模型
const ProjectMember = seq.define('project_members', {
  projectId: {
    type: DataTypes.INTEGER,
    comment: '项目id'
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '成员id'
  }
})

// ProjectMember.sync({ alter: true })

module.exports = ProjectMember
