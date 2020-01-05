import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SubjektivTestModule } from '../../../test.module';
import { DocumentSubDetailComponent } from 'app/entities/document-sub/document-sub-detail.component';
import { DocumentSub } from 'app/shared/model/document-sub.model';

describe('Component Tests', () => {
  describe('DocumentSub Management Detail Component', () => {
    let comp: DocumentSubDetailComponent;
    let fixture: ComponentFixture<DocumentSubDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ document: new DocumentSub(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [DocumentSubDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DocumentSubDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentSubDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load document on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.document).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
