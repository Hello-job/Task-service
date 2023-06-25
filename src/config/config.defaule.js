const dotenv = require('dotenv')

// if (process.env.NODE_ENV === 'development') {
//   dotenv.config({ path: '.env' })
// } else if (process.env.NODE_ENV === 'production') {
//   dotenv.config({ path: '.env.production' })
// }
dotenv.config()
module.exports = process.env
