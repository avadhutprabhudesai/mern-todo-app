const http = require('http');

const app = require('./app');
const { mongoConnect } = require('./services/mongo');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoConnect('prod');
  await server.listen(PORT, () => {
    console.log(`Worker listening on ${PORT}`);
  });
}

startServer();
