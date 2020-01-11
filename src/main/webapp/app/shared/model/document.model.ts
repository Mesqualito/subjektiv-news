import { Moment } from 'moment';
import { IContent } from 'app/shared/model/content.model';
import { IRelease } from 'app/shared/model/release.model';

export interface IDocument {
  id?: number;
  title?: string;
  version?: number;
  publishDate?: Moment;
  uploadTimestamp?: Moment;
  numberOfPages?: number;
  fileSize?: number;
  downloadLink?: string;
  mimeType?: string;
  content?: IContent;
  release?: IRelease;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public title?: string,
    public version?: number,
    public publishDate?: Moment,
    public uploadTimestamp?: Moment,
    public numberOfPages?: number,
    public fileSize?: number,
    public downloadLink?: string,
    public mimeType?: string,
    public content?: IContent,
    public release?: IRelease
  ) {}
}
