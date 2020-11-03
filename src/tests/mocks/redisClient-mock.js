class RedisClientMock {
  constructor() {
    this.data = {}
  }
  getAsync(key) {
    const data = this.data[key]
    return Promise.resolve(data)
  }
  setAsync(key, data) {
    this.data[key] = data
    return Promise.resolve(data)
  }
}


module.exports = new RedisClientMock()