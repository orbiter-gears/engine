import * as fs from 'node:fs';
import { minimatch } from 'minimatch';

export default class Files extends Array<string> {

  public static readFromPath(prefix: string): Promise<Files> {
    return fs.promises
      .readdir(prefix, { encoding: 'utf-8', recursive: true })
      .then(files => new this(...files));
  }

  public push(...args: string[]): number {
    return super.push(...args);
  }

  public glob(pattern: string): Files {
    return this.filter(file => minimatch(file, pattern, { matchBase: true })) as Files;
  }
}
