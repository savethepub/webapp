import { Component } from '@angular/core';
import { IGastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

enum PageMode {
  SPLASH,
  DETAIL
}

@Component({
  selector: 'jhi-bar-page',
  templateUrl: './bar-page.component.html',
  styleUrls: ['./bar-page.component.scss']
})
export class BarPageComponent {
  $gastronomy: Observable<IGastronomy | null>;
  PageMode = PageMode;
  pageMode = PageMode.DETAIL;

  constructor(protected gastronomyService: GastronomyService, private route: ActivatedRoute, private router: Router) {
    this.$gastronomy = this.route.params.pipe(
      flatMap(currentRoute => this.gastronomyService.find(currentRoute.operatorId)),
      map(httpEntity => httpEntity.body)
    );
  }

  public enterDetailPage(): void {
    this.pageMode = PageMode.DETAIL;
  }

  public enterPub(): void {
    this.route.params.subscribe(route => {
      this.router.navigate(['chat', route.operatorId]);
    });
  }
}
