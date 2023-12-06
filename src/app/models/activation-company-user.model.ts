import { CompanyModel } from '@models/company.model';
import { RolModel } from './rol.model';
import { EstadoModel } from './estado.model';
import { UsuarioModel } from './usuario.model';

export interface ActivationCompanyUserModel{
  id?: number;

  fechaInicio: string;

  fechaFin: string;

  idUser: number;
  user: UsuarioModel;

  idEstado: number;
  estado: EstadoModel;

  idCompany: number;
  company?: CompanyModel;

  roles: RolModel[];

  created_at?: string;

  updated_at?: string;
}
