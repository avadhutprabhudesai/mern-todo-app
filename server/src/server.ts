// import fs from 'fs';
// import path from 'path';
// import https, { Server } from 'https';
import http from 'http';
import 'dotenv/config';
import app from './app';
import { mongoConnect } from './services/mongo';
import { SERVERS } from './types';

// const server: Server = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
//   },
//   app
// );

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoConnect(SERVERS.PROD);
  await server.listen(PORT, () => {
    console.log(`Worker listening on ${PORT}`);
  });
}

startServer();
