import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReleaseSub, ReleaseSub } from 'app/shared/model/release-sub.model';
import { ReleaseSubService } from './release-sub.service';
import { ReleaseSubComponent } from './release-sub.component';
import { ReleaseSubDetailComponent } from './release-sub-detail.component';
import { ReleaseSubUpdateComponent } from './release-sub-update.component';

@Injectable({ providedIn: 'root' })
export class ReleaseSubResolve implements Resolve<IReleaseSub> {
  constructor(private service: ReleaseSubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReleaseSub> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((release: HttpResponse<ReleaseSub>) => {
          if (release.body) {
            return of(release.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReleaseSub());
  }
}

export const releaseRoute: Routes = [
  {
    path: '',
    component: ReleaseSubComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.release.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReleaseSubDetailComponent,
    resolve: {
      release: ReleaseSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.release.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReleaseSubUpdateComponent,
    resolve: {
      release: ReleaseSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.release.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReleaseSubUpdateComponent,
    resolve: {
      release: ReleaseSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.release.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
