FROM node:lts

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g nodemon 

RUN npm install \
 && mv /usr/src/app/node_modules /node_modules

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000


CMD [ "npm", "run", "dev" ]
