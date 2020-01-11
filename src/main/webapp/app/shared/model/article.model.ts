import { IRelease } from 'app/shared/model/release.model';

export interface IArticle {
  id?: number;
  headline?: string;
  pageNumber?: number;
  content?: any;
  release?: IRelease;
}

export class Article implements IArticle {
  constructor(public id?: number, public headline?: string, public pageNumber?: number, public content?: any, public release?: IRelease) {}
}
