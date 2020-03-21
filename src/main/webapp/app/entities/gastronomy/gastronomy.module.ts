import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SavethepubSharedModule } from 'app/shared/shared.module';
import { GastronomyComponent } from './gastronomy.component';
import { GastronomyDetailComponent } from './gastronomy-detail.component';
import { GastronomyUpdateComponent } from './gastronomy-update.component';
import { GastronomyDeleteDialogComponent } from './gastronomy-delete-dialog.component';
import { gastronomyRoute } from './gastronomy.route';

@NgModule({
  imports: [SavethepubSharedModule, RouterModule.forChild(gastronomyRoute)],
  declarations: [GastronomyComponent, GastronomyDetailComponent, GastronomyUpdateComponent, GastronomyDeleteDialogComponent],
  entryComponents: [GastronomyDeleteDialogComponent]
})
export class SavethepubGastronomyModule {}
