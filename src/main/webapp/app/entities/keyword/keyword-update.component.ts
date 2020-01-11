import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IKeyword, Keyword } from 'app/shared/model/keyword.model';
import { KeywordService } from './keyword.service';
import { IRelease } from 'app/shared/model/release.model';
import { ReleaseService } from 'app/entities/release/release.service';

@Component({
  selector: 'jhi-keyword-update',
  templateUrl: './keyword-update.component.html'
})
export class KeywordUpdateComponent implements OnInit {
  isSaving = false;

  releases: IRelease[] = [];

  editForm = this.fb.group({
    id: [],
    words: [null, [Validators.required]],
    documents: []
  });

  constructor(
    protected keywordService: KeywordService,
    protected releaseService: ReleaseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keyword }) => {
      this.updateForm(keyword);

      this.releaseService
        .query()
        .pipe(
          map((res: HttpResponse<IRelease[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRelease[]) => (this.releases = resBody));
    });
  }

  updateForm(keyword: IKeyword): void {
    this.editForm.patchValue({
      id: keyword.id,
      words: keyword.words,
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

  private createFromForm(): IKeyword {
    return {
      ...new Keyword(),
      id: this.editForm.get(['id'])!.value,
      words: this.editForm.get(['words'])!.value,
      documents: this.editForm.get(['documents'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeyword>>): void {
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

  trackById(index: number, item: IRelease): any {
    return item.id;
  }

  getSelected(selectedVals: IRelease[], option: IRelease): IRelease {
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
