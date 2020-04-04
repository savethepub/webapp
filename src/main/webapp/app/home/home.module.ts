import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SavethepubSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NavbarModule } from 'app/layouts/navbar/navbar.module';

@NgModule({
  imports: [SavethepubSharedModule, NavbarModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class SavethepubHomeModule {}
