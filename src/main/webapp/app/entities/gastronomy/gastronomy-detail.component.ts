import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IGastronomy } from 'app/shared/model/gastronomy.model';

@Component({
  selector: 'jhi-gastronomy-detail',
  templateUrl: './gastronomy-detail.component.html'
})
export class GastronomyDetailComponent implements OnInit {
  gastronomy: IGastronomy | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gastronomy }) => (this.gastronomy = gastronomy));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
