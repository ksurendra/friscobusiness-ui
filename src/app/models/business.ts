import { Address } from "./address";

export interface Business {
  id: String;
  businessId: String;
	businessName: String;
  businessAbout: String;
  businessPhone: String;
  businessEmail: String;
  businessWebsite: String;
  businessAddress: Address;
}

