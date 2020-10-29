const fetch = require('node-fetch');
const redisClient = require('../redis-client');
const { API_URL } = require('../config');
const HTTPError = require('../utils/HTTPError')
const logger = require('../utils/logger')

class ApiService {
  constructor(memoryClient, http, baseUrl) {
    this.memoryClient = memoryClient;
    this.http = http;
    this.baseUrl = baseUrl;
  }

  async get(endpoint, token) {
    const url = `${this.baseUrl}/${endpoint}`
    const cacheKey = endpoint
    let storedData = await redisClient.getAsync(cacheKey)

    if (storedData) {
      storedData = JSON.parse(storedData)
    }

    let headers = {};
    if (token) {
      headers.Authorization = 'Bearer ' + token
    }

    if (storedData && storedData.etag) {
      headers['If-None-Match'] = storedData.etag;
    }

    // MAKE REQUEST
    const response = await fetch(url, {
      headers
    })


    if (response.status === 304) {
      logger.info('from cache');
      return storedData.data;
    }

    if (!response.ok) {
      let errBody = { statusCode: response.status };
      if (response.body) {
        const { message } = await response.json()
        errBody.message = message;
      }
      throw new HTTPError(errBody.statusCode, errBody.message);
    }

    const data = await response.json()
    const etag = response.headers.get('Etag')
    if (etag) {
      redisClient.setAsync(endpoint, JSON.stringify({ data, etag }));
    }
    return data;
  }
}

const apiService = new ApiService(redisClient, fetch, API_URL);

module.exports = apiService