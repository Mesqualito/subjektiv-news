import { IReleaseSub } from 'app/shared/model/release-sub.model';

export interface IKeywordSub {
  id?: number;
  word?: string;
  documents?: IReleaseSub[];
}

export class KeywordSub implements IKeywordSub {
  constructor(public id?: number, public word?: string, public documents?: IReleaseSub[]) {}
}
