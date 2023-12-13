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
    return this._coreService.get<JornadaModel[]>('jornadas/jornadas?data={"relations":["dias"]}');
  }

  public getJornadaById(id) {
    return this._coreService.get<JornadaModel>('jornadas/jornadas/' + id);
  }

  createJornada(jornada: JornadaModel) {
    return this._coreService.post<JornadaModel>('jornadas/jornadas', jornada);
  }

  updateJornada(jornada: JornadaModel) {
    return this._coreService.put('jornadas/jornadas/' + jornada.id, jornada);
  }

  deleteJornada(idJornada: number) {
    return this._coreService.delete('jornadas/jornadas/' + idJornada);
  }

}
