const express = require('express')
const app = express()
const routes = require('./routes')
const errorMiddleware = require('./middlewares/error')
const bearerToken = require('express-bearer-token');

const port = process.env.PORT || 3000


app.use(bearerToken());

app.use(express.json());
app.use('/api/v1', routes);

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})