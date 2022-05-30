import mongoose from 'mongoose';
import { Server } from '../typings/types';

function getMongoDBURL(server: Server) {
  return server === 'TEST'
    ? (process.env.MONGO_TEST_URL as string)
    : (process.env.MONGO_PROD_URL as string);
}

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', () => {
  console.error('MongoDB connection error');
});

async function mongoConnect(server: Server) {
  await mongoose.connect(getMongoDBURL(server));
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

async function dropCollection(name: string) {
  await mongoose.connection.dropCollection(name);
}

export { mongoConnect, mongoDisconnect, dropCollection };
