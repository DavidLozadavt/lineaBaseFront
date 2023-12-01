import { CompanyModel } from "./company.model";

export interface ProcesoModel {
  id?: number;
  nombreProceso: string;
  descripcion: string;
  idCompany:number;
  company?:CompanyModel
}
