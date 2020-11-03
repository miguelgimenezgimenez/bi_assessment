require('dotenv').config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT
const COOKIE_SECRET = process.env.COOKIE_SECRET


module.exports = {
  API_URL,
  PORT,
  COOKIE_SECRET
}