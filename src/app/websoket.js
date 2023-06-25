const WebSocket = require('ws')
const { createChat } = require('../service/chatRecord.service')

const listen = port => {
  const wss = new WebSocket.Server({ port })

  // 处理WebSocket连接
  wss.on('connection', (socket, req) => {
    const userId = req.url.split('?')[1].split('=')[1]
    socket.id = userId
    // 处理WebSocket消息
    socket.on('message', message => {
      // 广播消息给所有连接的客户端
      const data = JSON.parse(message.toString('utf-8'))
      const msgType = data.type
      console.log('收到WebSocket消息：', data)

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          switch (msgType) {
            case 'chat':
              if (client.id == data.receiverId) {
                const { senderId, receiverId, message, sessionId } = data
                const objcetMsg = {
                  senderId,
                  receiverId,
                  message,
                  sessionId
                }
                createChat(objcetMsg)
                client.send(
                  JSON.stringify({
                    type: msgType,
                    data: {
                      ...objcetMsg,
                      createdAt: +new Date()
                    }
                  })
                )
              }
          }
        }
      })
    })
  })
}

module.exports = {
  listen
}
