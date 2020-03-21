import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SavethepubTestModule } from '../../../test.module';
import { GastronomyDetailComponent } from 'app/entities/gastronomy/gastronomy-detail.component';
import { Gastronomy } from 'app/shared/model/gastronomy.model';

describe('Component Tests', () => {
  describe('Gastronomy Management Detail Component', () => {
    let comp: GastronomyDetailComponent;
    let fixture: ComponentFixture<GastronomyDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ gastronomy: new Gastronomy(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SavethepubTestModule],
        declarations: [GastronomyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GastronomyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GastronomyDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load gastronomy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gastronomy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
