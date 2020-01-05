import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReleaseSub } from 'app/shared/model/release-sub.model';
import { ReleaseSubService } from './release-sub.service';

@Component({
  templateUrl: './release-sub-delete-dialog.component.html'
})
export class ReleaseSubDeleteDialogComponent {
  release?: IReleaseSub;

  constructor(protected releaseService: ReleaseSubService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.releaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('releaseListModification');
      this.activeModal.close();
    });
  }
}
