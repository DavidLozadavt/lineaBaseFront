import { Injectable } from '@angular/core';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class TipoTransaccionService {
  tipo_transaccion: TipoTransaccionModel;
  permisos: number;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerTipo_transaccion() {
    return this._coreService.get<TipoTransaccionModel[]>('pagos/tipo_transacciones');
  }




  crearTipo_transaccion(tipo_transaccion: TipoTransaccionModel) {

    tipo_transaccion.detalle = tipo_transaccion.detalle.toUpperCase();
    tipo_transaccion.descripcion = tipo_transaccion.descripcion.toUpperCase();
    return this._coreService.post<TipoTransaccionModel>('pagos/tipo_transacciones', tipo_transaccion);
  }


  eliminarTipo_transaccion(tipo_transaccionId: number) {
    return this._coreService.delete('pagos/tipo_transacciones/' + tipo_transaccionId);
  }

  actualizarTipo_transaccion(tipo_transaccion: TipoTransaccionModel) {
    tipo_transaccion.detalle = tipo_transaccion.detalle.toUpperCase();
    tipo_transaccion.descripcion = tipo_transaccion.descripcion.toUpperCase();
    return this._coreService.put('pagos/tipo_transacciones/' + tipo_transaccion.id, tipo_transaccion);
  }

}
