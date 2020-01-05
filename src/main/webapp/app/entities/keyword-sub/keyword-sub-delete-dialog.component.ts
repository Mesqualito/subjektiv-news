import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IKeywordSub } from 'app/shared/model/keyword-sub.model';
import { KeywordSubService } from './keyword-sub.service';

@Component({
  templateUrl: './keyword-sub-delete-dialog.component.html'
})
export class KeywordSubDeleteDialogComponent {
  keyword?: IKeywordSub;

  constructor(protected keywordService: KeywordSubService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.keywordService.delete(id).subscribe(() => {
      this.eventManager.broadcast('keywordListModification');
      this.activeModal.close();
    });
  }
}
