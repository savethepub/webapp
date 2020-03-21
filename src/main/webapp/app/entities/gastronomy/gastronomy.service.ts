import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGastronomy } from 'app/shared/model/gastronomy.model';

type EntityResponseType = HttpResponse<IGastronomy>;
type EntityArrayResponseType = HttpResponse<IGastronomy[]>;

@Injectable({ providedIn: 'root' })
export class GastronomyService {
  public resourceUrl = SERVER_API_URL + 'api/gastronomies';

  constructor(protected http: HttpClient) {}

  create(gastronomy: IGastronomy): Observable<EntityResponseType> {
    return this.http.post<IGastronomy>(this.resourceUrl, gastronomy, { observe: 'response' });
  }

  update(gastronomy: IGastronomy): Observable<EntityResponseType> {
    return this.http.put<IGastronomy>(this.resourceUrl, gastronomy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGastronomy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGastronomy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
