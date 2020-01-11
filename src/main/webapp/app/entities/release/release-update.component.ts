import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRelease, Release } from 'app/shared/model/release.model';
import { ReleaseService } from './release.service';

@Component({
  selector: 'jhi-release-update',
  templateUrl: './release-update.component.html'
})
export class ReleaseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    chronoOrderNo: [null, [Validators.required]]
  });

  constructor(protected releaseService: ReleaseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ release }) => {
      this.updateForm(release);
    });
  }

  updateForm(release: IRelease): void {
    this.editForm.patchValue({
      id: release.id,
      title: release.title,
      chronoOrderNo: release.chronoOrderNo
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
      chronoOrderNo: this.editForm.get(['chronoOrderNo'])!.value
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
}
