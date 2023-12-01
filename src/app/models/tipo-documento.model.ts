import { CompanyModel } from "./company.model";

export interface TipoDocumentoModel {
  id: number;
  tituloDocumento: string;
  descripcion?: string;
  idCompany: number;
  company?:CompanyModel
}
