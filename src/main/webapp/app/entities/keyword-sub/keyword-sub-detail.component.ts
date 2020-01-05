import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKeywordSub } from 'app/shared/model/keyword-sub.model';

@Component({
  selector: 'jhi-keyword-sub-detail',
  templateUrl: './keyword-sub-detail.component.html'
})
export class KeywordSubDetailComponent implements OnInit {
  keyword: IKeywordSub | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ keyword }) => {
      this.keyword = keyword;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
