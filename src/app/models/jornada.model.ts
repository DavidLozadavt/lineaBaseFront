import { CompanyModel } from "@models/company.model";

export interface JornadaModel {

  id?: number;

  nombreJornada: string;

  descripcion?: string;

  horaInicial: string;

  horaFinal: string;

  numeroHoras: number;

  idCompany?: number;
  company?: CompanyModel;

}
