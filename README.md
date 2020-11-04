
## Description

API REST following the swagger specs found at https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/static/index.html

To do this assessment i have created an express app, with a connection to redis , (all embedded in a Docker container).
The redis db is used to create a cache layer, this cache layer has been added on a service called apiService, this could be improved moving the caching layer to the 
controllers, thus being able to cache parsed and filtered data.

The token renewal has been done in a "hacky" way since I wasn't provided with a refresh token, the way the renewal of the token has been done, is giving a session id
to the user by a cookie, then after login in that sessionId will have associated with the user credentials (they will always stay in the server, since I will only be sending the 
session id) And for every request there will be a middleware checing if that session has a user associated, if it does it will check the expiration time of the token,
and if it's expired it will renew it.

I have also had to find a workaround for the permissions, since the token provided didn't contain any info about the role, so in the tests I have assumed that this 
data will be embedded in the token's payload, thus giving the user access certain routes. When doing the checks for permissions I will assume that user "dare" is admin.

The app is tested using jest, there could be more tests, but I believe there is some basic tests.

## IMPORTANT NOTE!:

I have been testing the app by testing the app and using postman, I have just tried to test it using swagger and realized that it wasn't setting the cookie, so I have had to do a hacky hotfix to make it work( this code is in the refresh token file ). I said i was gonna send the assessment today, but would like to get that fixed so might add a commit to fix this problem.


## IMPROVEMENTS


I believe that maybe I should have put the caching layer on the controllers, but this would have added more complexity to the app and don't have so much time. 
I didn't want to create one apiService method for each endpoint, since this tends to make the api service to have too much methdods, but I have created one method that
calls 2 endpoints, I believe this could be improved, but like I said I dont have that much time ;).

## USAGE

To be able to access the endpoints we should first do a POST request to this endpoint:

http://localhost:3000/api/v1/login

with the following body : 
```
{
  "username": "username",
  "password": "password"
}
```

This will send a set-cookie header wich will identify the user with that session.
After that we will be able to access all the endpoints specified in the specs at: 

https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/static/index.html


## RUNNING THE APP

``` docker-compose up```

## RUNNING THE TESTS

``` npm test```

## TECH STACK

**Express**

**Redis**

**Docker**

**Jest**

