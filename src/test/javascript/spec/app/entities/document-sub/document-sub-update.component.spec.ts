import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { DocumentSubUpdateComponent } from 'app/entities/document-sub/document-sub-update.component';
import { DocumentSubService } from 'app/entities/document-sub/document-sub.service';
import { DocumentSub } from 'app/shared/model/document-sub.model';

describe('Component Tests', () => {
  describe('DocumentSub Management Update Component', () => {
    let comp: DocumentSubUpdateComponent;
    let fixture: ComponentFixture<DocumentSubUpdateComponent>;
    let service: DocumentSubService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [DocumentSubUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DocumentSubUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DocumentSubUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DocumentSubService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DocumentSub(123);
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
        const entity = new DocumentSub();
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
