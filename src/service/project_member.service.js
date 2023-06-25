const ProjectMember = require('../module/project_member.module')

class ProjectMemberServicer {
  async createProjectMember(parmas) {
    try {
      const { projectId, memberId } = parmas
      const res = await ProjectMember.create({
        project_id: projectId,
        member_id: memberId
      })
      return res
    } catch (err) {}
  }
  async getMemberProjecs(params) {
    try {
      const { id } = params
      const res = await ProjectMember.findAll({
        attrbutes: ['project_id'],
        where: {
          member_id: id
        }
      })
      return res
    } catch (err) {
      return err
    }
  }
}

module.exports = new ProjectMemberServicer()
