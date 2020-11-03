const { promisify } = require('util')
const app = require('./app')
const port = require('./config').PORT


const startServer = async () => {
  await promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}

startServer()