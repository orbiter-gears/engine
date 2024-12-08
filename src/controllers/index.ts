import { Router, Request, Response } from 'express';
import Surface from 'surface/surface';
import Archive from 'surface/archive';

export default function attach(router: Router): void {
  router.get('/', handler);
}

const filename = '/home/user/WebstormProjects/orbiter-gears/Orbiter2016/Textures/Earth/Archive/Surf.tree';
// const filename = '/media/user/6ED4FB88D4FB5137/Users/workstation/Desktop/Orbiter/Orbiter-x64/Textures/Earth/Archive/Surf.tree';
const archive = new Archive(filename);
const surface = new Surface(archive);

function handler(request: Request, response: Response): void {
  const header = Object.assign({}, archive.header, {
    data: {
      offset: archive.header.data.offset,
      length: archive.header.data.length.toString()
    }
  });

  response.write('Hello engine!\n');
  response.write(JSON.stringify(header, undefined, 2));
  response.end();
}

