import { IArticle } from 'app/shared/model/article.model';
import { IDocument } from 'app/shared/model/document.model';
import { IKeyword } from 'app/shared/model/keyword.model';

export interface IRelease {
  id?: number;
  title?: string;
  chronoOrderNo?: number;
  articles?: IArticle[];
  documents?: IDocument[];
  keywords?: IKeyword[];
}

export class Release implements IRelease {
  constructor(
    public id?: number,
    public title?: string,
    public chronoOrderNo?: number,
    public articles?: IArticle[],
    public documents?: IDocument[],
    public keywords?: IKeyword[]
  ) {}
}
