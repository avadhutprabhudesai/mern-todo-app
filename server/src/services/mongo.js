const mongoose = require('mongoose');

function getMongoDBURL(server = 'test') {
  return server === 'test'
    ? process.env.MONGO_TEST_URL
    : process.env.MONGO_PROD_URL;
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
