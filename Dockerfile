FROM node:lts-alpine

WORKDIR /app

# copy root package.json
COPY package.json ./

# copy client package.json and npm install client and build client
COPY client/package.json client/
RUN npm install --prefix client

# copy server package.json and npm install server
COPY server/package.json server/
RUN npm install --prefix server


# copy rest of the client code into the destination
COPY ./client ./client/
RUN npm run prod --prefix client

# copy rest of the server code into the destination
COPY ./server ./server/
RUN npm run build --prefix server

RUN npm install pm2 -g

# USER node

# start the server
CMD [ "npm", "start", "--prefix","server" ]