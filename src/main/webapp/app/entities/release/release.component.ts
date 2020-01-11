import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRelease } from 'app/shared/model/release.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReleaseService } from './release.service';
import { ReleaseDeleteDialogComponent } from './release-delete-dialog.component';

@Component({
  selector: 'jhi-release',
  templateUrl: './release.component.html'
})
export class ReleaseComponent implements OnInit, OnDestroy {
  releases: IRelease[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected releaseService: ReleaseService,
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
      .subscribe((res: HttpResponse<IRelease[]>) => this.paginateReleases(res.body, res.headers));
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

  trackId(index: number, item: IRelease): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReleases(): void {
    this.eventSubscriber = this.eventManager.subscribe('releaseListModification', () => this.reset());
  }

  delete(release: IRelease): void {
    const modalRef = this.modalService.open(ReleaseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.release = release;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateReleases(data: IRelease[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.releases.push(data[i]);
      }
    }
  }
}
