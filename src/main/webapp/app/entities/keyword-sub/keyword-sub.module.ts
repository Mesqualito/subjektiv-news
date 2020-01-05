import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivSharedModule } from 'app/shared/shared.module';
import { KeywordSubComponent } from './keyword-sub.component';
import { KeywordSubDetailComponent } from './keyword-sub-detail.component';
import { KeywordSubUpdateComponent } from './keyword-sub-update.component';
import { KeywordSubDeleteDialogComponent } from './keyword-sub-delete-dialog.component';
import { keywordRoute } from './keyword-sub.route';

@NgModule({
  imports: [SubjektivSharedModule, RouterModule.forChild(keywordRoute)],
  declarations: [KeywordSubComponent, KeywordSubDetailComponent, KeywordSubUpdateComponent, KeywordSubDeleteDialogComponent],
  entryComponents: [KeywordSubDeleteDialogComponent]
})
export class SubjektivKeywordSubModule {}
