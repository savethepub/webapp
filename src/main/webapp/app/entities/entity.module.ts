import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'gastronomy',
        loadChildren: () => import('./gastronomy/gastronomy.module').then(m => m.SavethepubGastronomyModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SavethepubEntityModule {}
