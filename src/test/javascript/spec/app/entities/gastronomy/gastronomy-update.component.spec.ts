import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SavethepubTestModule } from '../../../test.module';
import { GastronomyUpdateComponent } from 'app/entities/gastronomy/gastronomy-update.component';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';
import { Gastronomy } from 'app/shared/model/gastronomy.model';

describe('Component Tests', () => {
  describe('Gastronomy Management Update Component', () => {
    let comp: GastronomyUpdateComponent;
    let fixture: ComponentFixture<GastronomyUpdateComponent>;
    let service: GastronomyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SavethepubTestModule],
        declarations: [GastronomyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GastronomyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GastronomyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GastronomyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gastronomy(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gastronomy();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
