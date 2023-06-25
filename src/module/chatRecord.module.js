const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建数据表模型
const ChatRecord = seq.define('chat_record', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '会话id'
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '发送方'
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '接收方'
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '消息内容'
  },
  message_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'text',
    comment: '消息类型'
  }
})

// ChatRecord.sync({ alter: true })

module.exports = ChatRecord
