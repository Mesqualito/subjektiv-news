import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ReleaseSubService } from 'app/entities/release-sub/release-sub.service';
import { IReleaseSub, ReleaseSub } from 'app/shared/model/release-sub.model';

describe('Service Tests', () => {
  describe('ReleaseSub Service', () => {
    let injector: TestBed;
    let service: ReleaseSubService;
    let httpMock: HttpTestingController;
    let elemDefault: IReleaseSub;
    let expectedResult: IReleaseSub | IReleaseSub[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ReleaseSubService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ReleaseSub(0, 'AAAAAAA', 0, currentDate, currentDate, 0, 0, 'AAAAAAA');
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

      it('should create a ReleaseSub', () => {
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
          .create(new ReleaseSub())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ReleaseSub', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            versionCount: 1,
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT),
            numberOfPages: 1,
            fileSize: 1,
            downloadLink: 'BBBBBB'
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

      it('should return a list of ReleaseSub', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            versionCount: 1,
            publishDate: currentDate.format(DATE_FORMAT),
            uploadTimestamp: currentDate.format(DATE_TIME_FORMAT),
            numberOfPages: 1,
            fileSize: 1,
            downloadLink: 'BBBBBB'
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

      it('should delete a ReleaseSub', () => {
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
