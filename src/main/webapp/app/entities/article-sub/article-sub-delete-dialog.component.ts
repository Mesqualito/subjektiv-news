import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleSub } from 'app/shared/model/article-sub.model';
import { ArticleSubService } from './article-sub.service';

@Component({
  templateUrl: './article-sub-delete-dialog.component.html'
})
export class ArticleSubDeleteDialogComponent {
  article?: IArticleSub;

  constructor(protected articleService: ArticleSubService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.articleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('articleListModification');
      this.activeModal.close();
    });
  }
}
