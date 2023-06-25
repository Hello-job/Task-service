const { Sequelize } = require('sequelize')

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require('../config/config.defaule')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
})

seq
  .authenticate()
  .then(res => {
    console.log('>>>>>>数据库链接成功')
  })
  .catch(err => {
    console.log('>>>>>err', err)
  })

module.exports = seq
