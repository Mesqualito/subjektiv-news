import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArticleSub } from 'app/shared/model/article-sub.model';

type EntityResponseType = HttpResponse<IArticleSub>;
type EntityArrayResponseType = HttpResponse<IArticleSub[]>;

@Injectable({ providedIn: 'root' })
export class ArticleSubService {
  public resourceUrl = SERVER_API_URL + 'api/articles';

  constructor(protected http: HttpClient) {}

  create(article: IArticleSub): Observable<EntityResponseType> {
    return this.http.post<IArticleSub>(this.resourceUrl, article, { observe: 'response' });
  }

  update(article: IArticleSub): Observable<EntityResponseType> {
    return this.http.put<IArticleSub>(this.resourceUrl, article, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArticleSub>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticleSub[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
