import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocumentSub, DocumentSub } from 'app/shared/model/document-sub.model';
import { DocumentSubService } from './document-sub.service';
import { DocumentSubComponent } from './document-sub.component';
import { DocumentSubDetailComponent } from './document-sub-detail.component';
import { DocumentSubUpdateComponent } from './document-sub-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentSubResolve implements Resolve<IDocumentSub> {
  constructor(private service: DocumentSubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumentSub> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((document: HttpResponse<DocumentSub>) => {
          if (document.body) {
            return of(document.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocumentSub());
  }
}

export const documentRoute: Routes = [
  {
    path: '',
    component: DocumentSubComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.document.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocumentSubDetailComponent,
    resolve: {
      document: DocumentSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.document.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocumentSubUpdateComponent,
    resolve: {
      document: DocumentSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.document.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocumentSubUpdateComponent,
    resolve: {
      document: DocumentSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.document.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
