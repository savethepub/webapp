import { GastronomyCategory } from 'app/shared/model/enumerations/gastronomy-category.model';

export interface IGastronomy {
  id?: number;
  name?: string;
  category?: GastronomyCategory;
  description?: any;
  photoContentType?: string;
  photo?: any;
  contactName?: string;
  addressLine?: string;
  zipCode?: string;
  city?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  gofundmeName?: string;
  supportLink?: string;
}

export class Gastronomy implements IGastronomy {
  constructor(
    public id?: number,
    public name?: string,
    public category?: GastronomyCategory,
    public description?: any,
    public photoContentType?: string,
    public photo?: any,
    public contactName?: string,
    public addressLine?: string,
    public zipCode?: string,
    public city?: string,
    public facebookLink?: string,
    public twitterLink?: string,
    public instagramLink?: string,
    public gofundmeName?: string,
    public supportLink?: string
  ) {}
}
