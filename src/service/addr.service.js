const Addr = require("../module/addr.module");

class AddrService {
  async createAddr(params) {
    const { consignee, phone, address, user_id } = params;
    return await Addr.create({ consignee, phone, address, user_id });
  }
}

module.exports = new AddrService();
