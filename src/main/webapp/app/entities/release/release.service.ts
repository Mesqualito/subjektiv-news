import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRelease } from 'app/shared/model/release.model';

type EntityResponseType = HttpResponse<IRelease>;
type EntityArrayResponseType = HttpResponse<IRelease[]>;

@Injectable({ providedIn: 'root' })
export class ReleaseService {
  public resourceUrl = SERVER_API_URL + 'api/releases';

  constructor(protected http: HttpClient) {}

  create(release: IRelease): Observable<EntityResponseType> {
    return this.http.post<IRelease>(this.resourceUrl, release, { observe: 'response' });
  }

  update(release: IRelease): Observable<EntityResponseType> {
    return this.http.put<IRelease>(this.resourceUrl, release, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRelease>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRelease[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
