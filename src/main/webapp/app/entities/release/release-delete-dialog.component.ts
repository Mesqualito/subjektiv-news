import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelease } from 'app/shared/model/release.model';
import { ReleaseService } from './release.service';

@Component({
  templateUrl: './release-delete-dialog.component.html'
})
export class ReleaseDeleteDialogComponent {
  release?: IRelease;

  constructor(protected releaseService: ReleaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

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
