const fetch = require('node-fetch');
const querystring = require('querystring');
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

  async get(endpoint, token, query = {}) {
    console.log(token)
    const qs = querystring.encode(query)
    let url = `${this.baseUrl}/${endpoint}`
    if (qs.length) {
      url += `?${qs}`
    }
    const cacheKey = `${endpoint}-${qs}`
    let storedData = await this.memoryClient.getAsync(cacheKey)

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
    // the call method is to avoid changing the context of the method
    const response = await this.http(url, {
      headers
    })


    if (response.status === 304) {
      logger.info('from cache');
      return storedData.data;
    }

    if (!response.ok) {
      return this.throwError(response);
    }

    const data = await response.json()
    const etag = response.headers.get('Etag')
    if (etag) {
      this.memoryClient.setAsync(endpoint, JSON.stringify({ data, etag }));
    }
    return data;
  }

  async post(endpoint, body) {
    const url = `${this.baseUrl}/${endpoint}`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return this.throwError(response);
    }
    const data = await response.json()

    return data;

  }

  async throwError(response) {
    const status = response.status
    let message = response.statusText
    if (response.body) {
      const body = await response.json()
      message = body.message
    }
    throw new HTTPError(status, message);
  }
}

const apiService = new ApiService(redisClient, fetch, API_URL);

module.exports = apiService