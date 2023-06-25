const {
  createSessionId,
  getSessionRecord
} = require('../service/chatRecord.service')
const { v4: uuidv4 } = require('uuid')

class ChatController {
  async createSessioId(ctx, next) {
    const { senderId, receiverId } = ctx.request.body
    const sessionId = uuidv4()
    try {
      const res = await createSessionId({ senderId, receiverId, sessionId })
      ctx.body = {
        code: 0,
        message: '',
        result: {
          sessionId
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  async getChatRecord(ctx, next) {
    const { sessionId } = ctx.request.body
    try {
      const res = await getSessionRecord({ sessionId })
      ctx.body = {
        code: 0,
        message: '',
        result: {
          data: res
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new ChatController()
