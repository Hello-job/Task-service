
const { APP_HOST } = require('./config/config.defaule')

const app = require('./app')

app.listen(APP_HOST, () => {
    console.log(`server is running no http://localhost:${APP_HOST}`)
})