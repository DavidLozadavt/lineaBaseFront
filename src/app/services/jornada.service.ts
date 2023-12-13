import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { JornadaModel } from '@models/jornada.model';
@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  medioPagoModel: JornadaModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public getJornadas() {
    return this._coreService.get<JornadaModel[]>('jornadas/jornadas');
  }

  public getJornadaById(id) {
    return this._coreService.get<JornadaModel>('jornadas/jornadas/' + id);
  }

  crearMedioPago(jornada: JornadaModel) {
    return this._coreService.post<JornadaModel>('jornadas/jornadas', jornada);
  }

  actualizarMedioPago(jornada: JornadaModel) {
    return this._coreService.put('jornadas/jornadas/' + jornada.id, jornada);
  }

  eliminarMedioPago(idJornada: number) {
    return this._coreService.delete('jornadas/jornadas/' + idJornada);
  }

}
