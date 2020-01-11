import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DocumentService } from 'app/entities/document/document.service';
import { Document, IDocument } from 'app/shared/model/document.model';

describe('Service Tests', () => {
  describe('Document Service', () => {
    let injector: TestBed;
    let service: DocumentService;
    let httpMock: HttpTestingController;
    let elemDefault: IDocument;
    let expectedResult: IDocument | IDocument[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DocumentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Document(0, 'AAAAAAA', 0, currentDate, currentDate, 0, 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Document', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            publishDate: currentDate,
            uploadTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .create(new Document())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Document', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            version: 1,
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT),
            numberOfPages: 1,
            fileSize: 1,
            downloadLink: 'BBBBBB',
            mimeType: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            publishDate: currentDate,
            uploadTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Document', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            version: 1,
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT),
            numberOfPages: 1,
            fileSize: 1,
            downloadLink: 'BBBBBB',
            mimeType: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            publishDate: currentDate,
            uploadTimestamp: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Document', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
