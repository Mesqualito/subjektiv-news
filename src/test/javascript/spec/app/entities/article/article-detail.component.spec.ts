import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SubjektivNewsTestModule } from '../../../test.module';
import { ArticleDetailComponent } from 'app/entities/article/article-detail.component';
import { Article } from 'app/shared/model/article.model';

describe('Component Tests', () => {
  describe('Article Management Detail Component', () => {
    let comp: ArticleDetailComponent;
    let fixture: ComponentFixture<ArticleDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ article: new Article(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivNewsTestModule],
        declarations: [ArticleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArticleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArticleDetailComponent);
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
