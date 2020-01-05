export interface IArticleSub {
  id?: number;
  headline?: string;
  pageNumber?: number;
  content?: any;
  releaseVersionCount?: string;
  releaseId?: number;
}

export class ArticleSub implements IArticleSub {
  constructor(
    public id?: number,
    public headline?: string,
    public pageNumber?: number,
    public content?: any,
    public releaseVersionCount?: string,
    public releaseId?: number
  ) {}
}
