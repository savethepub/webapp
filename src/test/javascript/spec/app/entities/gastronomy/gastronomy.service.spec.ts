import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';
import { IGastronomy, Gastronomy } from 'app/shared/model/gastronomy.model';
import { GastronomyCategory } from 'app/shared/model/enumerations/gastronomy-category.model';

describe('Service Tests', () => {
  describe('Gastronomy Service', () => {
    let injector: TestBed;
    let service: GastronomyService;
    let httpMock: HttpTestingController;
    let elemDefault: IGastronomy;
    let expectedResult: IGastronomy | IGastronomy[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GastronomyService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Gastronomy(
        0,
        'AAAAAAA',
        GastronomyCategory.BAR,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Gastronomy', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Gastronomy()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Gastronomy', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            category: 'BBBBBB',
            description: 'BBBBBB',
            photo: 'BBBBBB',
            contactName: 'BBBBBB',
            addressLine: 'BBBBBB',
            zipCode: 'BBBBBB',
            city: 'BBBBBB',
            facebookLink: 'BBBBBB',
            twitterLink: 'BBBBBB',
            instagramLink: 'BBBBBB',
            gofundmeName: 'BBBBBB',
            supportLink: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Gastronomy', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            category: 'BBBBBB',
            description: 'BBBBBB',
            photo: 'BBBBBB',
            contactName: 'BBBBBB',
            addressLine: 'BBBBBB',
            zipCode: 'BBBBBB',
            city: 'BBBBBB',
            facebookLink: 'BBBBBB',
            twitterLink: 'BBBBBB',
            instagramLink: 'BBBBBB',
            gofundmeName: 'BBBBBB',
            supportLink: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Gastronomy', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
