const express = require('express')
const app = express()
const routes = require('./routes')
const errorMiddleware = require('./middlewares/error')

const redisClient = require('./redis-client');


const port = process.env.PORT || 3000
app.use(express.json());
app.use(routes)

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})