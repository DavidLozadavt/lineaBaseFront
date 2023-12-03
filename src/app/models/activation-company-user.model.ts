import { CompanyModel } from '@models/company.model';
import { RolModel } from './rol.model';

export interface ActivationCompanyUserModel {
  id?: number;
  idUser: number;
  idEstado: number;
  idCompany: number;
  fechaInicio: string;
  fechaFin: string;
  created_at?: string;
  updated_at?: string;
  company?: CompanyModel;
  roles: RolModel[];
}
