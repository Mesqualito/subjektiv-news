import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReleaseSub } from 'app/shared/model/release-sub.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReleaseSubService } from './release-sub.service';
import { ReleaseSubDeleteDialogComponent } from './release-sub-delete-dialog.component';

@Component({
  selector: 'jhi-release-sub',
  templateUrl: './release-sub.component.html'
})
export class ReleaseSubComponent implements OnInit, OnDestroy {
  releases: IReleaseSub[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected releaseService: ReleaseSubService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.releases = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.releaseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IReleaseSub[]>) => this.paginateReleases(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.releases = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReleases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReleaseSub): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReleases(): void {
    this.eventSubscriber = this.eventManager.subscribe('releaseListModification', () => this.reset());
  }

  delete(release: IReleaseSub): void {
    const modalRef = this.modalService.open(ReleaseSubDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.release = release;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateReleases(data: IReleaseSub[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.releases.push(data[i]);
      }
    }
  }
}
