import { NgModule } from '@angular/core';
import { NavbarComponent } from 'app/layouts/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { SavethepubSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ActiveMenuDirective } from './active-menu.directive';

@NgModule({
  imports: [BrowserModule, SavethepubSharedModule, RouterModule],
  declarations: [NavbarComponent, ActiveMenuDirective],
  exports: [NavbarComponent]
})
export class NavbarModule {}
