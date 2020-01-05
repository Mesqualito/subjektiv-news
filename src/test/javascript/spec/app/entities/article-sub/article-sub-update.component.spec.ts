import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { ArticleSubUpdateComponent } from 'app/entities/article-sub/article-sub-update.component';
import { ArticleSubService } from 'app/entities/article-sub/article-sub.service';
import { ArticleSub } from 'app/shared/model/article-sub.model';

describe('Component Tests', () => {
  describe('ArticleSub Management Update Component', () => {
    let comp: ArticleSubUpdateComponent;
    let fixture: ComponentFixture<ArticleSubUpdateComponent>;
    let service: ArticleSubService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [ArticleSubUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArticleSubUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArticleSubUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArticleSubService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleSub(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArticleSub();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
