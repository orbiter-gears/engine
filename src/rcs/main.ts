import { Router, Request, Response } from 'express';
import Application from '../application';

/**
 * Main Router Controller
 * @param router
 * @param application
 */
export function mainRc(router: Router, application: Application): void {
  router
    .get('/', getSurfaceArchivesList.bind(application))
  ;
}


function getSurfaceArchivesList(this: Application, request: Request, response: Response): void {
  const archives = this.findSurfacesArchives();
  const json = JSON.stringify(archives, null, 2);
  response.setHeader('Content-Type', 'application/json');
  response.end(json);
}

