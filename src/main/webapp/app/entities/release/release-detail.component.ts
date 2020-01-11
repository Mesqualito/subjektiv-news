import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelease } from 'app/shared/model/release.model';
import { IDocument } from 'app/shared/model/document.model';
import * as FileSaver from 'file-saver';
import { DocumentService } from 'app/entities/document/document.service';

@Component({
  selector: 'jhi-release-detail',
  templateUrl: './release-detail.component.html'
})
export class ReleaseDetailComponent implements OnInit {
  release: IRelease | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected documentService: DocumentService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ release }) => {
      this.release = release;
    });
  }

  downloadDocument(document: IDocument) {
    this.documentService.download(document.id).subscribe(file => {
      FileSaver.saveAs(file, document.title);
    });
  }

  previousState(): void {
    window.history.back();
  }
}
