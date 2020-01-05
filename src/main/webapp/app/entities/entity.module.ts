import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'release-sub',
        loadChildren: () => import('./release-sub/release-sub.module').then(m => m.SubjektivReleaseSubModule)
      },
      {
        path: 'article-sub',
        loadChildren: () => import('./article-sub/article-sub.module').then(m => m.SubjektivArticleSubModule)
      },
      {
        path: 'keyword-sub',
        loadChildren: () => import('./keyword-sub/keyword-sub.module').then(m => m.SubjektivKeywordSubModule)
      },
      {
        path: 'document-sub',
        loadChildren: () => import('./document-sub/document-sub.module').then(m => m.SubjektivDocumentSubModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SubjektivEntityModule {}
