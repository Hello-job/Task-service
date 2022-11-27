const { createAddr } = require("../service/addr.service.js");

class AddrController {
  async create(ctx, next) {
    const { consignee, phone, address } = ctx.request.body;
    const res = await createAddr(consignee, phone, address);
  }
}

module.exports = new AddrController();
