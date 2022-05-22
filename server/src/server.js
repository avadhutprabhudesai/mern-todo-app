const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const MONGODB_URL =
  'mongodb+srv://root:tpwKYwhLD35f7Nn6@mern-todo.0v21g.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error');
});

async function startServer() {
  await mongoose.connect(MONGODB_URL);

  await server.listen(PORT, () => {
    console.log(`Worker listening on ${PORT}`);
  });
}

startServer();
