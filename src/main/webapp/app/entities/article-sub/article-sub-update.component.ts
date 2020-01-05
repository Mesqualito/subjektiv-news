import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IArticleSub, ArticleSub } from 'app/shared/model/article-sub.model';
import { ArticleSubService } from './article-sub.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IReleaseSub } from 'app/shared/model/release-sub.model';
import { ReleaseSubService } from 'app/entities/release-sub/release-sub.service';

@Component({
  selector: 'jhi-article-sub-update',
  templateUrl: './article-sub-update.component.html'
})
export class ArticleSubUpdateComponent implements OnInit {
  isSaving = false;

  releases: IReleaseSub[] = [];

  editForm = this.fb.group({
    id: [],
    headline: [null, [Validators.required]],
    pageNumber: [null, [Validators.required]],
    content: [],
    releaseId: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected articleService: ArticleSubService,
    protected releaseService: ReleaseSubService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.updateForm(article);

      this.releaseService
        .query()
        .pipe(
          map((res: HttpResponse<IReleaseSub[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IReleaseSub[]) => (this.releases = resBody));
    });
  }

  updateForm(article: IArticleSub): void {
    this.editForm.patchValue({
      id: article.id,
      headline: article.headline,
      pageNumber: article.pageNumber,
      content: article.content,
      releaseId: article.releaseId
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('subjektivApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.createFromForm();
    if (article.id !== undefined) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  private createFromForm(): IArticleSub {
    return {
      ...new ArticleSub(),
      id: this.editForm.get(['id'])!.value,
      headline: this.editForm.get(['headline'])!.value,
      pageNumber: this.editForm.get(['pageNumber'])!.value,
      content: this.editForm.get(['content'])!.value,
      releaseId: this.editForm.get(['releaseId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleSub>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IReleaseSub): any {
    return item.id;
  }
}
