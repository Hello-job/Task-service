const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Addr = seq.define('zd_addr', {
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人'
  },
  phone: {
    type: DataTypes.NUMBER,
    allowNull: false,
    comment: '手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址'
  }
})

Addr.sync({ force: true })

module.exports = Addr
