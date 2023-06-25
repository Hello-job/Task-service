const ChatRecord = require('../module/chatRecord.module')

class ChatRecordService {
  async createSessionId(params) {
    try {
      const { sessionId, senderId, receiverId } = params
      return await ChatRecord.create({ sessionId, senderId, receiverId })
    } catch (err) {
      console.log('err', err)
    }
  }
  async createChat(params) {
    try {
      const { message, senderId, receiverId, sessionId } = params
      return await ChatRecord.create({
        message,
        senderId,
        receiverId,
        sessionId
      })
    } catch (err) {
      console.log('>>>>>err', err)
    }
  }
  // 获取聊天记录
  async getSessionRecord(params) {
    try {
      let attributes = [
        'id',
        'sessionId',
        'senderId',
        'receiverId',
        'message',
        'message_type',
        'createdAt'
      ]
      return await ChatRecord.findAll({
        attributes,
        where: params
      })
    } catch (err) {
      console.log('>>>>>err', err)
    }
  }
}

module.exports = new ChatRecordService()
