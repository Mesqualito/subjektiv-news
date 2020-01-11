import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRelease, Release } from 'app/shared/model/release.model';
import { ReleaseService } from './release.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';

@Component({
  selector: 'jhi-release-update',
  templateUrl: './release-update.component.html'
})
export class ReleaseUpdateComponent implements OnInit {
  isSaving = false;

  documents: IDocument[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    versionCount: [null, [Validators.required]],
    document: []
  });

  constructor(
    protected releaseService: ReleaseService,
    protected documentService: DocumentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ release }) => {
      this.updateForm(release);

      this.documentService
        .query({ filter: 'release-is-null' })
        .pipe(
          map((res: HttpResponse<IDocument[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDocument[]) => {
          if (!release.document || !release.document.id) {
            this.documents = resBody;
          } else {
            this.documentService
              .find(release.document.id)
              .pipe(
                map((subRes: HttpResponse<IDocument>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDocument[]) => {
                this.documents = concatRes;
              });
          }
        });
    });
  }

  updateForm(release: IRelease): void {
    this.editForm.patchValue({
      id: release.id,
      title: release.title,
      versionCount: release.versionCount,
      document: release.document
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

  private createFromForm(): IRelease {
    return {
      ...new Release(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      versionCount: this.editForm.get(['versionCount'])!.value,
      document: this.editForm.get(['document'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRelease>>): void {
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

  trackById(index: number, item: IDocument): any {
    return item.id;
  }
}
