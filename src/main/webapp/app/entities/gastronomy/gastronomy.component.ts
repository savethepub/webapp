import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from './gastronomy.service';
import { GastronomyDeleteDialogComponent } from './gastronomy-delete-dialog.component';

@Component({
  selector: 'jhi-gastronomy',
  templateUrl: './gastronomy.component.html'
})
export class GastronomyComponent implements OnInit, OnDestroy {
  gastronomies?: IGastronomy[];
  eventSubscriber?: Subscription;

  constructor(
    protected gastronomyService: GastronomyService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.gastronomyService.query().subscribe((res: HttpResponse<IGastronomy[]>) => (this.gastronomies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGastronomies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGastronomy): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInGastronomies(): void {
    this.eventSubscriber = this.eventManager.subscribe('gastronomyListModification', () => this.loadAll());
  }

  delete(gastronomy: IGastronomy): void {
    const modalRef = this.modalService.open(GastronomyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gastronomy = gastronomy;
  }
}
