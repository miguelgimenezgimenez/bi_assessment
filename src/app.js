const express = require('express')
const cors = require('cors')
const bearerToken = require('express-bearer-token');
const session = require('express-session')
const routes = require('./routes')
const error = require('./middlewares/error')
const refreshToken = require('./middlewares/refreshToken')
const { COOKIE_SECRET, WHITE_LIST } = require('./config')

const app = express()

const sess = {
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: false,
    secure: false,
  },
  saveUninitialized: true,
  resave: true
}


const corsOptions = {
  origin: WHITE_LIST,
  credentials: true
}

// this is just for swagger to work
app.use(bearerToken())

app.use(cors(corsOptions))

app.use(session(sess))
app.use(refreshToken)
app.use(express.json())
app.use('/api/v1', routes)
app.use(error)

module.exports = app
