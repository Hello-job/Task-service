const { Op } = require('sequelize')
const Project = require('../module/project.module')
const {
  createProjectMember,
  getMemberProjecs
} = require('./project_member.service')

class ProjectService {
  async createProejct(params) {
    try {
      const { name, project_img = '', creator, desc = '' } = params
      const res = await Project.create({
        name,
        project_img,
        creator,
        desc
      })
      await createProjectMember({
        projectId: res.id,
        memberId: creator
      })
      return res
    } catch (err) {}
  }
  async deleteProject(params) {
    try {
      const { id } = params
      const res = await Project.destroy({
        where: {
          id
        }
      })
      return res
    } catch (err) {}
  }
  async updateProject(params) {
    try {
      const { id, ...other } = params
      const res = await Project.update(
        { ...other },
        {
          where: {
            id
          }
        }
      )
      return res
    } catch (err) {
      return err
    }
  }
  async projectList(params) {
    try {
      const { id } = parmas
      let attrbutes = ['name', 'project_img', 'creator', 'desc']
      const projectIds = await getMemberProjecs({
        id
      })
      const res = await Project.findAll({
        attrbutes,
        where: {
          id: projectIds
        }
      })
      return res
    } catch (err) {}
  }
}

module.exports = new ProjectService()
