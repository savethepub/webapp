import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from './gastronomy.service';

@Component({
  templateUrl: './gastronomy-delete-dialog.component.html'
})
export class GastronomyDeleteDialogComponent {
  gastronomy?: IGastronomy;

  constructor(
    protected gastronomyService: GastronomyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gastronomyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gastronomyListModification');
      this.activeModal.close();
    });
  }
}
