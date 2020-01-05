import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SubjektivTestModule } from '../../../test.module';
import { ArticleSubDetailComponent } from 'app/entities/article-sub/article-sub-detail.component';
import { ArticleSub } from 'app/shared/model/article-sub.model';

describe('Component Tests', () => {
  describe('ArticleSub Management Detail Component', () => {
    let comp: ArticleSubDetailComponent;
    let fixture: ComponentFixture<ArticleSubDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ article: new ArticleSub(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [ArticleSubDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArticleSubDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleSubDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load article on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.article).toEqual(jasmine.objectContaining({ id: 123 }));
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
