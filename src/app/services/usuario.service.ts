import { Injectable } from '@angular/core';
import { UsuarioModel } from '@models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreService } from './core.service';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _coreService: CoreService
  ) { }

  public traerUsuarios() {
    return this._coreService.get<ActivationCompanyUserModel[]>('users/users');
  }

  public actualizarUsuario(usuario: UsuarioModel) {
    return this._coreService.put('users/users' + usuario.id, usuario);

  }

  public crearUsuario(usuario: UsuarioModel) {
    return this._coreService.post<UsuarioModel>('users/users', usuario);
  }

  public asignarRoles(data: any): Observable<Object[]> {
    return this._coreService
      .put('permisos/asignar_roles', data)
      .pipe(map(response => response as Object[]));
  }

  public eliminarUsuario(userId: number) {
    return this._coreService.delete('users/users/' + userId);
  }

}
