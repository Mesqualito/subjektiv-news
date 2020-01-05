import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IKeywordSub } from 'app/shared/model/keyword-sub.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { KeywordSubService } from './keyword-sub.service';
import { KeywordSubDeleteDialogComponent } from './keyword-sub-delete-dialog.component';

@Component({
  selector: 'jhi-keyword-sub',
  templateUrl: './keyword-sub.component.html'
})
export class KeywordSubComponent implements OnInit, OnDestroy {
  keywords: IKeywordSub[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected keywordService: KeywordSubService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.keywords = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.keywordService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IKeywordSub[]>) => this.paginateKeywords(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.keywords = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInKeywords();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IKeywordSub): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInKeywords(): void {
    this.eventSubscriber = this.eventManager.subscribe('keywordListModification', () => this.reset());
  }

  delete(keyword: IKeywordSub): void {
    const modalRef = this.modalService.open(KeywordSubDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.keyword = keyword;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateKeywords(data: IKeywordSub[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.keywords.push(data[i]);
      }
    }
  }
}
