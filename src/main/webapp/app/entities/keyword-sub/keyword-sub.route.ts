import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IKeywordSub, KeywordSub } from 'app/shared/model/keyword-sub.model';
import { KeywordSubService } from './keyword-sub.service';
import { KeywordSubComponent } from './keyword-sub.component';
import { KeywordSubDetailComponent } from './keyword-sub-detail.component';
import { KeywordSubUpdateComponent } from './keyword-sub-update.component';

@Injectable({ providedIn: 'root' })
export class KeywordSubResolve implements Resolve<IKeywordSub> {
  constructor(private service: KeywordSubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKeywordSub> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((keyword: HttpResponse<KeywordSub>) => {
          if (keyword.body) {
            return of(keyword.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new KeywordSub());
  }
}

export const keywordRoute: Routes = [
  {
    path: '',
    component: KeywordSubComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.keyword.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: KeywordSubDetailComponent,
    resolve: {
      keyword: KeywordSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.keyword.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: KeywordSubUpdateComponent,
    resolve: {
      keyword: KeywordSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.keyword.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: KeywordSubUpdateComponent,
    resolve: {
      keyword: KeywordSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.keyword.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
