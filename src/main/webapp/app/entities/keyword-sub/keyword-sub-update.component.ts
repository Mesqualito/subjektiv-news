import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IKeywordSub, KeywordSub } from 'app/shared/model/keyword-sub.model';
import { KeywordSubService } from './keyword-sub.service';
import { IReleaseSub } from 'app/shared/model/release-sub.model';
import { ReleaseSubService } from 'app/entities/release-sub/release-sub.service';

@Component({
  selector: 'jhi-keyword-sub-update',
  templateUrl: './keyword-sub-update.component.html'
})
export class KeywordSubUpdateComponent implements OnInit {
  isSaving = false;

  releases: IReleaseSub[] = [];

  editForm = this.fb.group({
    id: [],
    word: [null, [Validators.required]],
    documents: []
  });

  constructor(
    protected keywordService: KeywordSubService,
    protected releaseService: ReleaseSubService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keyword }) => {
      this.updateForm(keyword);

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

  updateForm(keyword: IKeywordSub): void {
    this.editForm.patchValue({
      id: keyword.id,
      word: keyword.word,
      documents: keyword.documents
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const keyword = this.createFromForm();
    if (keyword.id !== undefined) {
      this.subscribeToSaveResponse(this.keywordService.update(keyword));
    } else {
      this.subscribeToSaveResponse(this.keywordService.create(keyword));
    }
  }

  private createFromForm(): IKeywordSub {
    return {
      ...new KeywordSub(),
      id: this.editForm.get(['id'])!.value,
      word: this.editForm.get(['word'])!.value,
      documents: this.editForm.get(['documents'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeywordSub>>): void {
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

  getSelected(selectedVals: IReleaseSub[], option: IReleaseSub): IReleaseSub {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
