import { CompanyModel } from "./company.model";

export interface RolModel {
  id?: number;
  guard_name?: string;

  name: string;
  idCompany?: number;
  company?: CompanyModel;
}
