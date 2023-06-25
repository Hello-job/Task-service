const { createProejct } = require('../service/project.service')

class addProjectController {
  async create(ctx, next) {
    const { name, project_img = '', creator, desc = '' } = ctx.request.body
    const res = await createProejct({
      name,
      project_img,
      creator,
      desc
    })
  }
}

module.exports = new addProjectController()
