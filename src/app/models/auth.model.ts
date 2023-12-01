import { ActivationCompanyUserModel } from '@models/activation-company-user.model';
import { PersonaModel } from './persona.model';

export interface AuthModel {
  persona: PersonaModel;
  permission: string;
  userActivate: ActivationCompanyUserModel;
}
