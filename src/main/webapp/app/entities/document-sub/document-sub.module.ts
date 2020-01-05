import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivSharedModule } from 'app/shared/shared.module';
import { DocumentSubComponent } from './document-sub.component';
import { DocumentSubDetailComponent } from './document-sub-detail.component';
import { DocumentSubUpdateComponent } from './document-sub-update.component';
import { DocumentSubDeleteDialogComponent } from './document-sub-delete-dialog.component';
import { documentRoute } from './document-sub.route';

@NgModule({
  imports: [SubjektivSharedModule, RouterModule.forChild(documentRoute)],
  declarations: [DocumentSubComponent, DocumentSubDetailComponent, DocumentSubUpdateComponent, DocumentSubDeleteDialogComponent],
  entryComponents: [DocumentSubDeleteDialogComponent]
})
export class SubjektivDocumentSubModule {}
