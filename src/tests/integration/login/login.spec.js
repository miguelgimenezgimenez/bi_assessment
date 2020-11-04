const app = require('../../../app')
const supertest = require('supertest')

const { adminToken } = require('../../mocks/mockData')
const adminCredentials = {
  'username': 'admin', 'password': 'testpass'
}

describe('login', () => {
  it('returns 400 if no credentials provided', async () => {
    const res = await supertest(app).post('/api/v1/login')
    expect(res.status).toBe(400)
  })
  it('Returns token, type and expires_in', async () => {
    const res = await supertest(app).post('/api/v1/login').send(adminCredentials)
    const expectedResponse = {
      token: adminToken,
      type: 'Bearer',
      expires_in: 600,
    }
    expect(res.body).toEqual(expectedResponse)
  })
})
