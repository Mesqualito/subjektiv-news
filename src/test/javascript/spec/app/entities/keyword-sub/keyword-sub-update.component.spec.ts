import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { KeywordSubUpdateComponent } from 'app/entities/keyword-sub/keyword-sub-update.component';
import { KeywordSubService } from 'app/entities/keyword-sub/keyword-sub.service';
import { KeywordSub } from 'app/shared/model/keyword-sub.model';

describe('Component Tests', () => {
  describe('KeywordSub Management Update Component', () => {
    let comp: KeywordSubUpdateComponent;
    let fixture: ComponentFixture<KeywordSubUpdateComponent>;
    let service: KeywordSubService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [KeywordSubUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KeywordSubUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KeywordSubUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KeywordSubService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new KeywordSub(123);
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
        const entity = new KeywordSub();
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
