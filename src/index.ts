import http from 'node:http';
import express from 'express';
import cors from 'cors';

import attachApiMainCtrl from './controllers/index';

const app = express();


// CORS
app.use(cors());


// Controllers
const router = express.Router();
app.use(router);

attachApiMainCtrl(router);


// Run
const server = new http.Server()
  .on('listening', () => console.log('Http Server listening to', server.address()))
  .on('request', app)
  .listen(8080);
