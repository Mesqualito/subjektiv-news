import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReleaseSub } from 'app/shared/model/release-sub.model';

type EntityResponseType = HttpResponse<IReleaseSub>;
type EntityArrayResponseType = HttpResponse<IReleaseSub[]>;

@Injectable({ providedIn: 'root' })
export class ReleaseSubService {
  public resourceUrl = SERVER_API_URL + 'api/releases';

  constructor(protected http: HttpClient) {}

  create(release: IReleaseSub): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(release);
    return this.http
      .post<IReleaseSub>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(release: IReleaseSub): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(release);
    return this.http
      .put<IReleaseSub>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReleaseSub>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReleaseSub[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(release: IReleaseSub): IReleaseSub {
    const copy: IReleaseSub = Object.assign({}, release, {
      publishDate: release.publishDate && release.publishDate.isValid() ? release.publishDate.format(DATE_FORMAT) : undefined,
      uploadTimestamp: release.uploadTimestamp && release.uploadTimestamp.isValid() ? release.uploadTimestamp.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.publishDate = res.body.publishDate ? moment(res.body.publishDate) : undefined;
      res.body.uploadTimestamp = res.body.uploadTimestamp ? moment(res.body.uploadTimestamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((release: IReleaseSub) => {
        release.publishDate = release.publishDate ? moment(release.publishDate) : undefined;
        release.uploadTimestamp = release.uploadTimestamp ? moment(release.uploadTimestamp) : undefined;
      });
    }
    return res;
  }
}
