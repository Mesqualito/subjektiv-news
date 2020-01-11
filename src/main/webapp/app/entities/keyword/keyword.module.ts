import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivNewsSharedModule } from 'app/shared/shared.module';
import { KeywordComponent } from './keyword.component';
import { KeywordDetailComponent } from './keyword-detail.component';
import { KeywordUpdateComponent } from './keyword-update.component';
import { KeywordDeleteDialogComponent } from './keyword-delete-dialog.component';
import { keywordRoute } from './keyword.route';

@NgModule({
  imports: [SubjektivNewsSharedModule, RouterModule.forChild(keywordRoute)],
  declarations: [KeywordComponent, KeywordDetailComponent, KeywordUpdateComponent, KeywordDeleteDialogComponent],
  entryComponents: [KeywordDeleteDialogComponent]
})
export class SubjektivNewsKeywordModule {}
