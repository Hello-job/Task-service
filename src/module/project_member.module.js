const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建数据表模型
const ProjectMember = seq.define('project', {
  project_id: {
    type: DataTypes.INTEGER,
    comment: '项目id'
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '成员id'
  }
})

// ProjectMember.sync({ force: true })

module.exports = ProjectMember
