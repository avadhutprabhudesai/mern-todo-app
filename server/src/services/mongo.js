const mongoose = require('mongoose');

function getMongoDBURL(server = 'test') {
  return `mongodb+srv://root:tpwKYwhLD35f7Nn6@mern-todo.0v21g.mongodb.net/${server}?retryWrites=true&w=majority`;
}

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error');
});

async function mongoConnect(server) {
  await mongoose.connect(getMongoDBURL(server));
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

async function dropCollection(name) {
  await mongoose.connection.dropCollection(name);
}

async function dropDB(name) {
  await mongoose.connection.dropDatabase(name);
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
  dropCollection,
  dropDB,
};
