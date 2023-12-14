import { CompanyModel } from "@models/company.model";
import { AsignacionDiaJornada } from "@models/asignacion-dia-jornada.model";

export interface JornadaModel {

  id?: number;

  nombreJornada: string;

  descripcion?: string;

  horaInicial: string;

  horaFinal: string;

  numeroHoras: string;

  idCompany?: number;
  company?: CompanyModel;

  dias?: AsignacionDiaJornada[];

}
