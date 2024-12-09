import { minimatch, Minimatch } from 'minimatch';
import Files from './files';

export default class Application {

  public static create(filesPrefix: string): Promise<Application> {
    return Promise
      .all([
        Files
          .readFromPath(filesPrefix)
          .then<[Files, string]>(files => [files, filesPrefix])
      ])
      .then(params => new this(...params))
  }

  public readonly filesPrefix: string;

  public readonly files: Files;

  private constructor([files, filesPrefix]: [Files, string]) {
    this.filesPrefix = filesPrefix;
    this.files = files;
  }

  public findSurfacesArchives(): string[] {
    return this.files
      .filter(file => minimatch(file, '@(Textures|Textures2)/**/Archive/*.tree', { matchBase: true }));
  }

  // public openArchive(index: number): void {
  //   const archivePath = this.options.archives[index];
  //   if (Number.isInteger(index)) {
  //     throw RangeError(`${this.constructor.name}: Unknown archive index: ${index}`);
  //   }
  //   const filename = path.join(this.options.assetsPath, archivePath);
  //   const archive = new Archive(filename);
  //   const surface = new Surface(archive);
  // }
}
