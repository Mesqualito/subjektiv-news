import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocument } from 'app/shared/model/document.model';

type EntityResponseType = HttpResponse<IDocument>;
type EntityArrayResponseType = HttpResponse<IDocument[]>;

@Injectable({ providedIn: 'root' })
export class DocumentService {
  public resourceUrl = SERVER_API_URL + 'api/documents';

  constructor(protected http: HttpClient) {}

  create(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .post<IDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(document: IDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(document);
    return this.http
      .put<IDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  download(id: number): Observable<Blob> {
    return this.http.get(`${this.resourceUrl}/${id}/$content`, { responseType: 'blob' });
  }

  protected convertDateFromClient(document: IDocument): IDocument {
    const copy: IDocument = Object.assign({}, document, {
      publishDate: document.publishDate && document.publishDate.isValid() ? document.publishDate.format(DATE_FORMAT) : undefined,
      uploadTimestamp: document.uploadTimestamp && document.uploadTimestamp.isValid() ? document.uploadTimestamp.toJSON() : undefined
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
      res.body.forEach((document: IDocument) => {
        document.publishDate = document.publishDate ? moment(document.publishDate) : undefined;
        document.uploadTimestamp = document.uploadTimestamp ? moment(document.uploadTimestamp) : undefined;
      });
    }
    return res;
  }
}
