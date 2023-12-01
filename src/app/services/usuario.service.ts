import { Injectable } from '@angular/core';
import { UsuarioModel } from '@models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _coreService: CoreService
  ) { }



  public traerUsuarios() {
    return this._coreService.get<UsuarioModel[]>('lista_usuarios');
  }

  public actualizarUsuario(usuario: UsuarioModel) {
    return this._coreService.put('usuarios/' + usuario.id, usuario);

  }

  public crearUsuario(usuario: UsuarioModel) {
    console.log(usuario);
    return this._coreService.post<UsuarioModel>('usuarios', usuario);
  }

  public asignarRoles(data: any): Observable<Object[]> {
    return this._coreService
      .put('permisos/asignar_roles', data)
      .pipe(map(response => response as Object[]));
  }

  public eliminarUsuario(userId: number) {
    return this._coreService.delete('usuarios/' + userId);
  }

}
