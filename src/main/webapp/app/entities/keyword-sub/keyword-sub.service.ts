import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IKeywordSub } from 'app/shared/model/keyword-sub.model';

type EntityResponseType = HttpResponse<IKeywordSub>;
type EntityArrayResponseType = HttpResponse<IKeywordSub[]>;

@Injectable({ providedIn: 'root' })
export class KeywordSubService {
  public resourceUrl = SERVER_API_URL + 'api/keywords';

  constructor(protected http: HttpClient) {}

  create(keyword: IKeywordSub): Observable<EntityResponseType> {
    return this.http.post<IKeywordSub>(this.resourceUrl, keyword, { observe: 'response' });
  }

  update(keyword: IKeywordSub): Observable<EntityResponseType> {
    return this.http.put<IKeywordSub>(this.resourceUrl, keyword, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKeywordSub>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeywordSub[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
