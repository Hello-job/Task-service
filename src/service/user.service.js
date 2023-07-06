const User = require("../module/user.module");
class UserService {
  async createUser(name, password) {
    try {
      const res = await User.create({ name, password });
      return res.dataValues;
    } catch (err) {}
  }

  /**
   *
   * @param {getType} param 验证token需要 password
   * @returns
   */
  async getUserInfo({ id, name, getType }) {
    try {
      const whereOpt = {};
      id && Object.assign(whereOpt, { id });
      name && Object.assign(whereOpt, { name });

      const exclude = getType ? [] : ["password"];
      const res = await User.findOne({
        attributes: {
          exclude,
        },
        where: whereOpt,
      });
      return res ? res.dataValues : null;
    } catch (err) {}
  }

  async updataUserinfo({ id, ...updataFields }) {
    try {
      const whereOpt = { id };
      const [record] = await User.update(updataFields, {
        where: whereOpt,
      });

      const updateInfo = await User.findOne({
        where: whereOpt,
        attributes: {
          exclude: ["password"],
        },
      });

      return updateInfo.dataValues;
    } catch (err) {}
  }

  /**
   * 获取去全部用户
   *
   */
  async userAll() {
    const res = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res;
  }
}

module.exports = new UserService();
