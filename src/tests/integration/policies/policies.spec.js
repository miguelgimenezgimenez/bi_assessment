const pick = require('lodash.pick')
const supertest = require('supertest')

const app = require('../../../app')
const { POLICIES, LOGIN } = require('../../../constants/endpoints')
const { POLICY_FIELDS } = require('../../../constants/fields')
const { clients, policies } = require('../../mocks/mockData')

const adminCredentials = {
  'username': 'admin', 'password': 'testpass'
}
const userCredentials = {
  'username': 'user', 'password': 'testpass'
}


describe('getPolicies', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get(`/api/v1/${POLICIES}`)
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}`)
    expect(res.status).toBe(200)

  })
  it('Returns all data for admin', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}`)
    const expected = policies.map(p => pick(p, POLICY_FIELDS))
    expect(res.body).toEqual(expected)
    expect(res.body.length).toBeLessThanOrEqual(10)
  })
  it('Returns only clients data for current user', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}`)
    const expectedResults = policies.reduce((acc, next) => {
      if (next.clientId === '3') {
        acc.push(pick(next, POLICY_FIELDS))
      }
      return acc
    }, [])
    expect(res.body).toEqual(expectedResults)
  })
})



describe('get Policy client', () => {
  it('returns 401 if user is not logged in', async () => {
    const res = await supertest(app).get(`/api/v1/${POLICIES}/id`)
    expect(res.status).toBe(401)
  })
  it('Returns 200 after successfull login', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}/7b624ed3-00d5-4c1b-9ab8-c265067ef58b`)
    expect(res.status).toBe(200)

  })
  it('Returns policy\'s client', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(adminCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}/7b624ed3-00d5-4c1b-9ab8-c265067ef58b`)

    expect(res.body).toEqual(clients[2])

  })
  it('Forbids non admin to access other clients data', async () => {
    const agent = supertest.agent(app)
    const login = await agent.post(`/api/v1/${LOGIN}`).send(userCredentials)
    const cookies = login.headers['set-cookie'][0].split(';')[0]
    agent.set('Cookie', cookies)
    const res = await agent.get(`/api/v1/${POLICIES}/56b415d6-53ee-4481-994f-4bffa47b5239`)

    expect(res.status).toBe(403)

  })

})