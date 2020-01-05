import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IReleaseSub, ReleaseSub } from 'app/shared/model/release-sub.model';
import { ReleaseSubService } from './release-sub.service';
import { IDocumentSub } from 'app/shared/model/document-sub.model';
import { DocumentSubService } from 'app/entities/document-sub/document-sub.service';

@Component({
  selector: 'jhi-release-sub-update',
  templateUrl: './release-sub-update.component.html'
})
export class ReleaseSubUpdateComponent implements OnInit {
  isSaving = false;

  documents: IDocumentSub[] = [];
  publishDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    versionCount: [null, [Validators.required]],
    publishDate: [null, [Validators.required]],
    uploadTimestamp: [],
    numberOfPages: [null, [Validators.required]],
    fileSize: [],
    downloadLink: [],
    documentId: []
  });

  constructor(
    protected releaseService: ReleaseSubService,
    protected documentService: DocumentSubService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ release }) => {
      this.updateForm(release);

      this.documentService
        .query({ filter: 'release-is-null' })
        .pipe(
          map((res: HttpResponse<IDocumentSub[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDocumentSub[]) => {
          if (!release.documentId) {
            this.documents = resBody;
          } else {
            this.documentService
              .find(release.documentId)
              .pipe(
                map((subRes: HttpResponse<IDocumentSub>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDocumentSub[]) => {
                this.documents = concatRes;
              });
          }
        });
    });
  }

  updateForm(release: IReleaseSub): void {
    this.editForm.patchValue({
      id: release.id,
      title: release.title,
      versionCount: release.versionCount,
      publishDate: release.publishDate,
      uploadTimestamp: release.uploadTimestamp != null ? release.uploadTimestamp.format(DATE_TIME_FORMAT) : null,
      numberOfPages: release.numberOfPages,
      fileSize: release.fileSize,
      downloadLink: release.downloadLink,
      documentId: release.documentId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const release = this.createFromForm();
    if (release.id !== undefined) {
      this.subscribeToSaveResponse(this.releaseService.update(release));
    } else {
      this.subscribeToSaveResponse(this.releaseService.create(release));
    }
  }

  private createFromForm(): IReleaseSub {
    return {
      ...new ReleaseSub(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      versionCount: this.editForm.get(['versionCount'])!.value,
      publishDate: this.editForm.get(['publishDate'])!.value,
      uploadTimestamp:
        this.editForm.get(['uploadTimestamp'])!.value != null
          ? moment(this.editForm.get(['uploadTimestamp'])!.value, DATE_TIME_FORMAT)
          : undefined,
      numberOfPages: this.editForm.get(['numberOfPages'])!.value,
      fileSize: this.editForm.get(['fileSize'])!.value,
      downloadLink: this.editForm.get(['downloadLink'])!.value,
      documentId: this.editForm.get(['documentId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReleaseSub>>): void {
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

  trackById(index: number, item: IDocumentSub): any {
    return item.id;
  }
}
