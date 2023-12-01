import { RolModel } from "./rol.model";

export interface UsuarioModel {
  id: number;
  email: string;
  contrasena: string;
  idCompany?: number;
  roles?: RolModel[];
}
