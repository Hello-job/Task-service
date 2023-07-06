const { createProejct, getprojectList } = require("../service/project.service");

const { userRequestErr, updataPswErr } = require("../constant/use.constant");

class addProjectController {
  async create(ctx, next) {
    const { name, projectImg = "", creator, desc = "" } = ctx.request.body;
    try {
      const res = await createProejct({
        name,
        projectImg,
        creator,
        desc,
      });
      ctx.body = {
        code: 0,
        message: "创建成功",
        result: {
          ...res,
        },
      };
    } catch (err) {
      ctx.app.emit("error", userRequestErr, ctx);
      return;
    }
  }
  async projectList(ctx, next) {
    const { userId } = ctx.request.query;
    try {
      const res = await getprojectList({ userId });
      ctx.body = {
        code: 0,
        message: "获取成功",
        result: res,
      };
    } catch (err) {
      ctx.body = {
        code: 1,
        message: "获取失败",
        result: res,
      };
    }
  }
}

module.exports = new addProjectController();
