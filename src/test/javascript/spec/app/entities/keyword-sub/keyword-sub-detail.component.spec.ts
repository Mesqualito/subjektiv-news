import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubjektivTestModule } from '../../../test.module';
import { KeywordSubDetailComponent } from 'app/entities/keyword-sub/keyword-sub-detail.component';
import { KeywordSub } from 'app/shared/model/keyword-sub.model';

describe('Component Tests', () => {
  describe('KeywordSub Management Detail Component', () => {
    let comp: KeywordSubDetailComponent;
    let fixture: ComponentFixture<KeywordSubDetailComponent>;
    const route = ({ data: of({ keyword: new KeywordSub(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SubjektivTestModule],
        declarations: [KeywordSubDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KeywordSubDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KeywordSubDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load keyword on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.keyword).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
