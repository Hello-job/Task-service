const { Op } = require('sequelize')
const Project = require('../module/project.module')
const User = require('../module/user.module')
const {
  createProjectMember,
  getMemberProjecs
} = require('./projectMember.service')

class ProjectService {
    /**
     * 创建项目
     * @param {参} params 
     * @returns 
     */
  async createProejct(params) {
    try {
      const { name, projectImg = '', creator, desc = '' } = params

      const res = await Project.create({
        name,
        projectImg,
        creator,
        desc
      })
      await createProjectMember({
        projectId: res.id,
        memberId: creator
      })
      return res.dataValues;
    } catch (err) {
    }
  }
  /**
   * 删除项目
   * @param {*} params 
   * @returns 
   */
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
  /**
   * 更新项目
   * @param {*} params 
   * @returns 
   */
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
  /**
   * 获取项目
   * @param {*} params 
   * @returns 
   */
  async getprojectList(params) {
    try {
      const { userId } = params
      const projectIds = await getMemberProjecs({
        id: userId
      })
      if (projectIds.length > 0) {
        const res = await Project.findAll({
            where: {
              id: projectIds
            },
            include: [{
                model: User,
                as: 'creatorInfo',
                attributes: ['id', 'avatar', 'createdAt', 'updatedAt', 'user_name']
            }]
        })
        const dataList = res.map(item => item.dataValues)
        return dataList
      }

    } catch (err) {}
  }
}

module.exports = new ProjectService()
