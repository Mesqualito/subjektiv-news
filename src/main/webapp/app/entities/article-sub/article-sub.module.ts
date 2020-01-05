import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivSharedModule } from 'app/shared/shared.module';
import { ArticleSubComponent } from './article-sub.component';
import { ArticleSubDetailComponent } from './article-sub-detail.component';
import { ArticleSubUpdateComponent } from './article-sub-update.component';
import { ArticleSubDeleteDialogComponent } from './article-sub-delete-dialog.component';
import { articleRoute } from './article-sub.route';

@NgModule({
  imports: [SubjektivSharedModule, RouterModule.forChild(articleRoute)],
  declarations: [ArticleSubComponent, ArticleSubDetailComponent, ArticleSubUpdateComponent, ArticleSubDeleteDialogComponent],
  entryComponents: [ArticleSubDeleteDialogComponent]
})
export class SubjektivArticleSubModule {}
