import fs from 'fs';
import path from 'path';
import https from 'https';
import 'dotenv/config';
import app from './app';
import { mongoConnect } from './services/mongo';
import './typings/types';

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
  },
  app
);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoConnect('PROD');
  await server.listen(PORT, () => {
    console.log(`Worker listening on ${PORT}`);
  });
}

startServer();
