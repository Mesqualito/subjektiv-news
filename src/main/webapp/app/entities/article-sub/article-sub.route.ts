import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IArticleSub, ArticleSub } from 'app/shared/model/article-sub.model';
import { ArticleSubService } from './article-sub.service';
import { ArticleSubComponent } from './article-sub.component';
import { ArticleSubDetailComponent } from './article-sub-detail.component';
import { ArticleSubUpdateComponent } from './article-sub-update.component';

@Injectable({ providedIn: 'root' })
export class ArticleSubResolve implements Resolve<IArticleSub> {
  constructor(private service: ArticleSubService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticleSub> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((article: HttpResponse<ArticleSub>) => {
          if (article.body) {
            return of(article.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ArticleSub());
  }
}

export const articleRoute: Routes = [
  {
    path: '',
    component: ArticleSubComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArticleSubDetailComponent,
    resolve: {
      article: ArticleSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticleSubUpdateComponent,
    resolve: {
      article: ArticleSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticleSubUpdateComponent,
    resolve: {
      article: ArticleSubResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'subjektivApp.article.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
