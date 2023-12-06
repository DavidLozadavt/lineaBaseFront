import { Injectable } from '@angular/core';
import { RolModel } from '@models/rol.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  rol: RolModel;
  permisos: number;
  constructor(
    private _coreService: CoreService
  ) { }

  public getRoles() {
    return this._coreService.get<RolModel[]>('roles/roles');
  }

  public rolBynombre(nombre: string) {
    let name = nombre.toUpperCase();
    return this._coreService.get('roles/virtualt/roles?nombre=' + name);
  }

  public rolesByCompany() {
    return this._coreService.get('roles/roles');
  }

  crearRol(rol: RolModel) {
    rol.name = rol.name.toUpperCase();
    return this._coreService.post<RolModel>('roles/roles', rol);
  }

  eliminarRol(rolId: number) {
    return this._coreService.delete('roles/roles/' + rolId);
  }

  actualizarRol(rol: RolModel) {
    rol.name = rol.name.toUpperCase();
    return this._coreService.put('roles/roles/' + rol.id, rol);
  }

}
