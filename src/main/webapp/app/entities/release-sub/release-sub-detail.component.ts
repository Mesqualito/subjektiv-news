import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReleaseSub } from 'app/shared/model/release-sub.model';

@Component({
  selector: 'jhi-release-sub-detail',
  templateUrl: './release-sub-detail.component.html'
})
export class ReleaseSubDetailComponent implements OnInit {
  release: IReleaseSub | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ release }) => {
      this.release = release;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
