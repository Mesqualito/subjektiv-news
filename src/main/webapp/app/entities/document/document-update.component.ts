import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content/content.service';

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
  isSaving = false;

  contents: IContent[] = [];
  publishDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    publishDate: [null, [Validators.required]],
    uploadTimestamp: [],
    numberOfPages: [null, [Validators.required]],
    fileSize: [],
    downloadLink: [],
    mimeType: [],
    content: []
  });

  constructor(
    protected documentService: DocumentService,
    protected contentService: ContentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document }) => {
      this.updateForm(document);

      this.contentService
        .query({ filter: 'document-is-null' })
        .pipe(
          map((res: HttpResponse<IContent[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IContent[]) => {
          if (!document.content || !document.content.id) {
            this.contents = resBody;
          } else {
            this.contentService
              .find(document.content.id)
              .pipe(
                map((subRes: HttpResponse<IContent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContent[]) => {
                this.contents = concatRes;
              });
          }
        });
    });
  }

  updateForm(document: IDocument): void {
    this.editForm.patchValue({
      id: document.id,
      title: document.title,
      publishDate: document.publishDate,
      uploadTimestamp: document.uploadTimestamp != null ? document.uploadTimestamp.format(DATE_TIME_FORMAT) : null,
      numberOfPages: document.numberOfPages,
      fileSize: document.fileSize,
      downloadLink: document.downloadLink,
      mimeType: document.mimeType,
      content: document.content
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document = this.createFromForm();
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    return {
      ...new Document(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      publishDate: this.editForm.get(['publishDate'])!.value,
      uploadTimestamp:
        this.editForm.get(['uploadTimestamp'])!.value != null
          ? moment(this.editForm.get(['uploadTimestamp'])!.value, DATE_TIME_FORMAT)
          : undefined,
      numberOfPages: this.editForm.get(['numberOfPages'])!.value,
      fileSize: this.editForm.get(['fileSize'])!.value,
      downloadLink: this.editForm.get(['downloadLink'])!.value,
      mimeType: this.editForm.get(['mimeType'])!.value,
      content: this.editForm.get(['content'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>): void {
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

  trackById(index: number, item: IContent): any {
    return item.id;
  }
}
