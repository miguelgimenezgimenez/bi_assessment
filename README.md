
## Description

API REST following the swagger specs found at https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/static/index.html

To do this assessment i have created an express app, with a connection to redis , (all embedded in a Docker container).
The redis db is used to create a cache layer, this cache layer has been added on a service called apiService, this could be improved moving the caching layer to the 
controllers, thus being able to cache parsed and filtered data.

The token renewal has been done in a "hacky" way since I wasn't provided with a refresh token, the way the renewal of the token has been done, is giving a session id
to the user by a cookie, then after login in that sessionId will have associated with the user credentials (they will always stay in the server, since I will only be sending the 
session id) And for every request there will be a middleware checking if that session has a user associated, if it does it will check the expiration time of the token,
and if it's expired it will renew it. This flow is by-passed if the cookie session is not being sent, but Authorization headers are, the reason for this is to allow the api to work with swagger, since Swagger has the withCredentials option set to false by default, so it won't send the required cookie for authentication.

I have also had to find a workaround for the permissions, since the token provided didn't contain any info about the role, so in the tests I have assumed that this 
data will be embedded in the token's payload, thus giving the user access certain routes. When doing the checks for permissions I will assume that user "dare" is admin.

### Note

Since the **GET clients** endpoint required merging the data from 2 endpoints, finding for each client all of it's policies. To do this I have created a helper with logarithmic complexity to merge the data, and have cached this results to improve performance, I have done this logic in the apiService instead of the controllers because the caching "layer" was there, that's why I believe that maybe I should have put the caching "layer" in the controllers.


The app is tested using jest, there could be more tests, but I believe the basic functionality is tested.

## IMPORTANT NOTE!:

Since I have done the authentication using a cookie with a sessionId, to allow the renewal of the token, I have had to do a hacky hotfix to make the api work in swagger(this code is in the refresh token file ). 

I haven't created a production environment, or deployed it , but have some experience doing it and can do it if necessary.

I have commited the dotenv on purpose file so you can use the project without adding the variables. Also I have not created a production environment.


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

