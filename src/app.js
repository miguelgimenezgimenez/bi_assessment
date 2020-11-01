const express = require('express')
const app = express()
const routes = require('./routes')
const error = require('./middlewares/error')
const refreshToken = require('./middlewares/refreshToken')

const session = require('express-session')
const { promisify } = require('util')

const port = process.env.PORT || 3000

const sess = {
  secret: process.env.COOKIE_SECRET,
  cookie: {},
  saveUninitialized: true,
  resave:true

}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use(refreshToken)

app.use(express.json())
app.use('/api/v1', routes)

app.use(error)

const startServer = async () => {
  await promisify(app.listen).bind(app)(port)
  console.log(`Listening on port ${port}`)
}

startServer()