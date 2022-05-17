const http = require('http');
const { default: app } = require('./app');

http.createServer(app);
