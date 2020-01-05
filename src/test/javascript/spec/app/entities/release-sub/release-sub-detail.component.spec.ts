import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { ReleaseSubDetailComponent } from 'app/entities/release-sub/release-sub-detail.component';
import { ReleaseSub } from 'app/shared/model/release-sub.model';

describe('Component Tests', () => {
  describe('ReleaseSub Management Detail Component', () => {
    let comp: ReleaseSubDetailComponent;
    let fixture: ComponentFixture<ReleaseSubDetailComponent>;
    const route = ({ data: of({ release: new ReleaseSub(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [ReleaseSubDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReleaseSubDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReleaseSubDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load release on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.release).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
