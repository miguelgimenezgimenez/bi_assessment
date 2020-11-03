const fetch = require('node-fetch')
const ApiService = require('./ApiService')
const redisClient = require('../../redisClient')
const redisClientMock = require('../../tests/mocks/redisClient-mock')
const fetchMock = require('../../tests/mocks/fetch-mock')
const { API_URL } = require('../../config')

if (process.env.NODE_ENV === 'test') {
  module.exports = new ApiService(redisClientMock, fetchMock, API_URL)
} else {
  module.exports = new ApiService(redisClient, fetch, API_URL)
}


