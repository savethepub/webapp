import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGastronomy, Gastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from './gastronomy.service';
import { GastronomyComponent } from './gastronomy.component';
import { GastronomyDetailComponent } from './gastronomy-detail.component';
import { GastronomyUpdateComponent } from './gastronomy-update.component';

@Injectable({ providedIn: 'root' })
export class GastronomyResolve implements Resolve<IGastronomy> {
  constructor(private service: GastronomyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGastronomy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gastronomy: HttpResponse<Gastronomy>) => {
          if (gastronomy.body) {
            return of(gastronomy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gastronomy());
  }
}

export const gastronomyRoute: Routes = [
  {
    path: '',
    component: GastronomyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'savethepubApp.gastronomy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GastronomyDetailComponent,
    resolve: {
      gastronomy: GastronomyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'savethepubApp.gastronomy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GastronomyUpdateComponent,
    resolve: {
      gastronomy: GastronomyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'savethepubApp.gastronomy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GastronomyUpdateComponent,
    resolve: {
      gastronomy: GastronomyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'savethepubApp.gastronomy.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
