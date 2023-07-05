const ProjectMember = require('../module/projectMember.module')

class ProjectMemberServicer {
  async createProjectMember(parmas) {
    try {
      const { projectId, memberId } = parmas
      const res = await ProjectMember.create({
        projectId: projectId,
        memberId: memberId
      })
      return res
    } catch (err) {}
  }
  async getMemberProjecs(params) {
    try {
      const { id } = params
      const res = await ProjectMember.findAll({
        where: {
          memberId: id
        }
      })
      if(res.length > 0) {
        return res.map(item => item.dataValues.id)
      } 
      return [];
    } catch (err) {
      return err
    }
  }
}

module.exports = new ProjectMemberServicer()
