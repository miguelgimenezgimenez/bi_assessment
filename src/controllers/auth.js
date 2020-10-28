// const apiService = require("../services/api")
const axios = require('axios')

const { API_URL } = require('../config')

const login = async (username, password) => {
  const url = `${API_URL}/api/login`
  

  
  // "client_id": "axa",
  // "client_secret": "s3cr3t"

  const token = await axios.post(url, { username, password })

  return token
}

module.exports = {

  login
}
