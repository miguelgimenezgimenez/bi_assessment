// this token contains this payload:
// {
//   "clientId": "3",
//   "iat": 1603990513,
//   "exp": 1603991113,
//   "role": "admin"
// } 
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMiLCJpYXQiOjE2MDM5OTA1MTMsImV4cCI6MTYwMzk5MTExMywicm9sZSI6ImFkbWluIn0.wTeisaZ783fne7Wxv5fg-jiKUCyqFmvhUYwbJcZtyvc'
// same but with role:user
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjMiLCJpYXQiOjE2MDM5OTA1MTMsImV4cCI6MTYwMzk5MTExMywicm9sZSI6InVzZXIifQ.aoiG3fBKk44LDCt7AQ0BxYpyxkFGRZNVEKj4EgNT6xQ'
const clients = [
  { 'id': '1', 'name': 'Barnett', 'email': 'barnettblankenship@quotezart.com', 'role': 'user' },
  { 'id': '2', 'name': 'Manning', 'email': 'manningblankenship@quotezart.com', 'role': 'admin' },
  { 'id': '3', 'name': 'Britney', 'email': 'britneyblankenship@quotezart.com', 'role': 'admin' },
  { 'id': '4', 'name': 'Miguel', 'email': 'miguel@quotezart.com', 'role': 'user' },

]
const policies = [
  {
    'id': '64cceef9-3a01-49ae-a23b-3761b604800b',
    'amountInsured': '1825.89',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2016-06-01T03:33:32Z',
    'installmentPayment': true,
    'clientId': '2'
  },
  {
    'id': '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
    'amountInsured': '399.89',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2015-07-06T06:55:49Z',
    'installmentPayment': true,
    'clientId': '3'
  },
  {
    'id': '56b415d6-53ee-4481-994f-4bffa47b5239',
    'amountInsured': '2301.98',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2014-12-01T05:53:13Z',
    'installmentPayment': false,
    'clientId': '2'
  },
  {
    'id': '6f514ec4-1726-4628-974d-20afe4da130c',
    'amountInsured': '697.04',
    'email': 'inesblankenship@quotezart.com',
    'inceptionDate': '2014-09-12T12:10:23Z',
    'installmentPayment': false,
    'clientId': '3'
  }]

const combinedData = [
  {
    'id': '1', 'name': 'Barnett', 'email': 'barnettblankenship@quotezart.com', 'role': 'user',
    policies: []
  },
  {
    'id': '2', 'name': 'Manning', 'email': 'manningblankenship@quotezart.com', 'role': 'admin',
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
  {
    'id': '3', 'name': 'Britney', 'email': 'britneyblankenship@quotezart.com', 'role': 'admin',
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
    'id': '4', 'name': 'Miguel', 'email': 'miguel@quotezart.com', 'role': 'user',
    policies: [

    ]
  },


]
module.exports = { adminToken, clients, combinedData, policies, userToken }