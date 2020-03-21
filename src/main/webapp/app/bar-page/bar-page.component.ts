import { Component } from '@angular/core';
import { IGastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-bar-page',
  templateUrl: './bar-page.component.html',
  styleUrls: ['./bar-page.component.scss']
})
export class BarPageComponent {
  $gastronomy: Observable<IGastronomy | null>;

  constructor(protected gastronomyService: GastronomyService, private route: ActivatedRoute) {
    this.$gastronomy = this.route.params.pipe(
      flatMap(currentRoute => this.gastronomyService.find(currentRoute.operatorId)),
      map(httpEntity => httpEntity.body)
    );
  }

  public enterPub(): void {
    alert('not implemented yet');
  }
}
