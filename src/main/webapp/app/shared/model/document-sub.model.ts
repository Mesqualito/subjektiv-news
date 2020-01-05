export interface IDocumentSub {
  id?: number;
  dataContentType?: string;
  data?: any;
  releaseId?: number;
}

export class DocumentSub implements IDocumentSub {
  constructor(public id?: number, public dataContentType?: string, public data?: any, public releaseId?: number) {}
}
