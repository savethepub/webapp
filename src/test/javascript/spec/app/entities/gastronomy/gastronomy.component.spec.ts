import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SavethepubTestModule } from '../../../test.module';
import { GastronomyComponent } from 'app/entities/gastronomy/gastronomy.component';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';
import { Gastronomy } from 'app/shared/model/gastronomy.model';

describe('Component Tests', () => {
  describe('Gastronomy Management Component', () => {
    let comp: GastronomyComponent;
    let fixture: ComponentFixture<GastronomyComponent>;
    let service: GastronomyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SavethepubTestModule],
        declarations: [GastronomyComponent]
      })
        .overrideTemplate(GastronomyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GastronomyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GastronomyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Gastronomy(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gastronomies && comp.gastronomies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
