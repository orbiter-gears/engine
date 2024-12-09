import http from 'node:http';
import express from 'express';
import cors from 'cors';

import Application from './application';

import { mainRc } from './rcs/main';

type RouterController = (router: express.Router, application: Application) => void;

// PARAMETERS

const assetsPath: string | undefined = process.env.ORBITER_ASSETS_PATH;
if (assetsPath === undefined || assetsPath.length === 0) {
  throw new Error(`Env var ORBITER_ASSETS_PATH is undefined. Set the path to orbiter's assets directory.`);
}


// ROUTER CONTROLLERS
const rcs: RouterController[] = [
  mainRc
];


// HTTP SERVER: INIT
const httpRequestHandler = express();
httpRequestHandler.use(cors());


// HTTP SERVER: START
const server = new http.Server()
  .on('listening', () => console.log('Http Server listening to', server.address()))
  .on('request', httpRequestHandler)
  .listen(8080);


// APPLICATION
Application
  .create(assetsPath)
  .then(application => {
    // create and setup router
    const router = express.Router();
    httpRequestHandler.use(router);

    // call router rcs
    for (const rc of rcs) {
      console.log('RC', rc.name);
      rc(router, application);
    }
  });
