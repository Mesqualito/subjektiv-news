import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentSub } from 'app/shared/model/document-sub.model';

type EntityResponseType = HttpResponse<IDocumentSub>;
type EntityArrayResponseType = HttpResponse<IDocumentSub[]>;

@Injectable({ providedIn: 'root' })
export class DocumentSubService {
  public resourceUrl = SERVER_API_URL + 'api/documents';

  constructor(protected http: HttpClient) {}

  create(document: IDocumentSub): Observable<EntityResponseType> {
    return this.http.post<IDocumentSub>(this.resourceUrl, document, { observe: 'response' });
  }

  update(document: IDocumentSub): Observable<EntityResponseType> {
    return this.http.put<IDocumentSub>(this.resourceUrl, document, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentSub>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentSub[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
