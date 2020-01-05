import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentSub } from 'app/shared/model/document-sub.model';
import { DocumentSubService } from './document-sub.service';

@Component({
  templateUrl: './document-sub-delete-dialog.component.html'
})
export class DocumentSubDeleteDialogComponent {
  document?: IDocumentSub;

  constructor(protected documentService: DocumentSubService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('documentListModification');
      this.activeModal.close();
    });
  }
}
