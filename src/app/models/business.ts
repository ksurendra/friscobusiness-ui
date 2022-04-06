import { Category } from "./category";

export interface Business {
  id: String;
	businessName: String;
  businessTagline: String;
  businessAddressLine1: String;
  businessAddressLine2: String;
  businessCity: String;
  businessState: String;
  businessZip: String;
  businessCounty: String;
  businessCountry: String;
  businessPhone1: String;
  businessPhone2: String;
  businessEmail1: String;
  businessEmail2: String;
  businessWebsite: String;
  businessLocation: String;
  businessCategory: Category;
}

