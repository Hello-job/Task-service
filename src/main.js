const {
  APP_HOST,
  APP_API_HOST,
  APP_SOKET_HOST
} = require('./config/config.defaule')

const app = require('./app')
const webSoketService = require('./app/websoket')

webSoketService.listen(APP_SOKET_HOST)
app.listen(APP_HOST, () => {
  console.log(`server is running no ${APP_API_HOST}`)
})
