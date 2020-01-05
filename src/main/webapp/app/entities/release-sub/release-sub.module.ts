import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubjektivSharedModule } from 'app/shared/shared.module';
import { ReleaseSubComponent } from './release-sub.component';
import { ReleaseSubDetailComponent } from './release-sub-detail.component';
import { ReleaseSubUpdateComponent } from './release-sub-update.component';
import { ReleaseSubDeleteDialogComponent } from './release-sub-delete-dialog.component';
import { releaseRoute } from './release-sub.route';

@NgModule({
  imports: [SubjektivSharedModule, RouterModule.forChild(releaseRoute)],
  declarations: [ReleaseSubComponent, ReleaseSubDetailComponent, ReleaseSubUpdateComponent, ReleaseSubDeleteDialogComponent],
  entryComponents: [ReleaseSubDeleteDialogComponent]
})
export class SubjektivReleaseSubModule {}
