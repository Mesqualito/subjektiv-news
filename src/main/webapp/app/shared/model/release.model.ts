import { IDocument } from 'app/shared/model/document.model';
import { IArticle } from 'app/shared/model/article.model';
import { IKeyword } from 'app/shared/model/keyword.model';

export interface IRelease {
  id?: number;
  title?: string;
  versionCount?: number;
  document?: IDocument;
  articles?: IArticle[];
  keywords?: IKeyword[];
}

export class Release implements IRelease {
  constructor(
    public id?: number,
    public title?: string,
    public versionCount?: number,
    public document?: IDocument,
    public articles?: IArticle[],
    public keywords?: IKeyword[]
  ) {}
}
