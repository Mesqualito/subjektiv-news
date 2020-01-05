import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { ReleaseSubUpdateComponent } from 'app/entities/release-sub/release-sub-update.component';
import { ReleaseSubService } from 'app/entities/release-sub/release-sub.service';
import { ReleaseSub } from 'app/shared/model/release-sub.model';

describe('Component Tests', () => {
  describe('ReleaseSub Management Update Component', () => {
    let comp: ReleaseSubUpdateComponent;
    let fixture: ComponentFixture<ReleaseSubUpdateComponent>;
    let service: ReleaseSubService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [ReleaseSubUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReleaseSubUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReleaseSubUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReleaseSubService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReleaseSub(123);
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
        const entity = new ReleaseSub();
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
