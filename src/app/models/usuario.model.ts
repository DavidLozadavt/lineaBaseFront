import { PersonaModel } from "./persona.model";
import { RolModel } from "./rol.model";

export interface UsuarioModel {
  id: number;
  email: string;
  contrasena: string;
  idCompany?: number;
  persona?:PersonaModel;
  roles?: RolModel[];
}
