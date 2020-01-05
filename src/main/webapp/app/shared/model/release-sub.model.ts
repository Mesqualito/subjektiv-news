import { Moment } from 'moment';
import { IArticleSub } from 'app/shared/model/article-sub.model';
import { IKeywordSub } from 'app/shared/model/keyword-sub.model';

export interface IReleaseSub {
  id?: number;
  title?: string;
  versionCount?: number;
  publishDate?: Moment;
  uploadTimestamp?: Moment;
  numberOfPages?: number;
  fileSize?: number;
  downloadLink?: string;
  documentId?: number;
  articles?: IArticleSub[];
  keywords?: IKeywordSub[];
}

export class ReleaseSub implements IReleaseSub {
  constructor(
    public id?: number,
    public title?: string,
    public versionCount?: number,
    public publishDate?: Moment,
    public uploadTimestamp?: Moment,
    public numberOfPages?: number,
    public fileSize?: number,
    public downloadLink?: string,
    public documentId?: number,
    public articles?: IArticleSub[],
    public keywords?: IKeywordSub[]
  ) {}
}
