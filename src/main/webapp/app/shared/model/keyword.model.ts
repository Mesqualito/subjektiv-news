import { IRelease } from 'app/shared/model/release.model';

export interface IKeyword {
  id?: number;
  words?: string;
  documents?: IRelease[];
}

export class Keyword implements IKeyword {
  constructor(public id?: number, public words?: string, public documents?: IRelease[]) {}
}
