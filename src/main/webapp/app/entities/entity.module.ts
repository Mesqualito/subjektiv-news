import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'release',
        loadChildren: () => import('./release/release.module').then(m => m.SubjektivNewsReleaseModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.SubjektivNewsArticleModule)
      },
      {
        path: 'keyword',
        loadChildren: () => import('./keyword/keyword.module').then(m => m.SubjektivNewsKeywordModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.SubjektivNewsDocumentModule)
      },
      {
        path: 'content',
        loadChildren: () => import('./content/content.module').then(m => m.SubjektivNewsContentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SubjektivNewsEntityModule {}
