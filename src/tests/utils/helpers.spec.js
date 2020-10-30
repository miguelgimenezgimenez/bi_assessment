const mockData = require('../mocks/mockData')
const mergeClientPolicies = require('../../utils/helpers').mergeClientPolicies
const clients = [
  { 'id': 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd', 'name': 'Barnett', 'email': 'barnettblankenship@quotezart.com', 'role': 'user' },
  { 'id': 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb', 'name': 'Manning', 'email': 'manningblankenship@quotezart.com', 'role': 'admin' },
  { 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86', 'name': 'Britney', 'email': 'britneyblankenship@quotezart.com', 'role': 'admin' },


]
const policies = [
  {
    'id': '64cceef9-3a01-49ae-a23b-3761b604800b',
    'amountInsured': '1825.89',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2016-06-01T03:33:32Z',
    'installmentPayment': true,
    'clientId': 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
  },
  {
    'id': '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
    'amountInsured': '399.89',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2015-07-06T06:55:49Z',
    'installmentPayment': true,
    'clientId': 'a0ece5db-cd14-4f21-812f-966633e7be86'
  },
  {
    'id': '56b415d6-53ee-4481-994f-4bffa47b5239',
    'amountInsured': '2301.98',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2014-12-01T05:53:13Z',
    'installmentPayment': false,
    'clientId': 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
  },
  {
    'id': '6f514ec4-1726-4628-974d-20afe4da130c',
    'amountInsured': '697.04',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2014-09-12T12:10:23Z',
    'installmentPayment': false,
    'clientId': 'a0ece5db-cd14-4f21-812f-966633e7be86'
  }]

const expectedResult = [
  {
    'id': 'a0ece5db-cd14-4f21-812f-966633e7be86', 'name': 'Britney', 'email': 'britneyblankenship@quotezart.com', 'role': 'admin',
    policies: [
      {
        'id': '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
        'amountInsured': '399.89',
        'inceptionDate': '2015-07-06T06:55:49Z',
      },
      {
        'id': '6f514ec4-1726-4628-974d-20afe4da130c',
        'amountInsured': '697.04',
        'inceptionDate': '2014-09-12T12:10:23Z',
      },
    ]
  },
  {
    'id': 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd', 'name': 'Barnett', 'email': 'barnettblankenship@quotezart.com', 'role': 'user',
    policies: []
  },
  {
    'id': 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb', 'name': 'Manning', 'email': 'manningblankenship@quotezart.com', 'role': 'admin',
    policies: [{
      'id': '64cceef9-3a01-49ae-a23b-3761b604800b',
      'amountInsured': '1825.89',
      'inceptionDate': '2016-06-01T03:33:32Z',
    },
    {
      'id': '56b415d6-53ee-4481-994f-4bffa47b5239',
      'amountInsured': '2301.98',
      'inceptionDate': '2014-12-01T05:53:13Z',
    },]
  },
]


describe('mergeClientPolicies', () => {
  it('Returns expected result with combined data', () => {
    const combinedData = mergeClientPolicies(clients, policies)
    expect(combinedData).toEqual(expectedResult);
  })
  it('Adds all existing policies to the clients object', () => {
    const combinedData = mergeClientPolicies(mockData.clients, mockData.policies)
    const numberOfPolicies = mockData.policies.length
    const addedPolicies = combinedData.reduce((acc, next) =>
      acc + next.policies.length, 0)
    expect(numberOfPolicies).toBe(addedPolicies);
  })
  it('Returns correct number of clients', () => {
    const combinedData = mergeClientPolicies(mockData.clients, mockData.policies)
    const numberOfClients = mockData.clients.length
    const returnedClients = combinedData.length
    expect(numberOfClients).toBe(returnedClients);
  })
});