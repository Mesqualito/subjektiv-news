import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';

@Component({
  templateUrl: './article-delete-dialog.component.html'
})
export class ArticleDeleteDialogComponent {
  article?: IArticle;

  constructor(protected articleService: ArticleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

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
