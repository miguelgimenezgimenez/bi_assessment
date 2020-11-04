require('dotenv').config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT
const COOKIE_SECRET = process.env.COOKIE_SECRET
const WHITE_LIST = process.env.WHITE_LIST


module.exports = {
  API_URL,
  PORT,
  COOKIE_SECRET,
  WHITE_LIST
}