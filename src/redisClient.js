const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('./config')
const client = redis.createClient(REDIS_URL)

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
}