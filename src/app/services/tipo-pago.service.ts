import { Injectable } from '@angular/core';
import { TipoPagoModel } from '@models/tipo-pago.model';
import { CoreService } from './core.service';
@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  tipoPagoModel: TipoPagoModel;
  constructor(
    private _coreService: CoreService
  ) { }

  public traerTipoPagos() {
    return this._coreService.get<TipoPagoModel[]>('pagos/tipo_pagos');
  }

  crearTipoPago(tPago: TipoPagoModel) {

    return this._coreService.post<TipoPagoModel>('pagos/tipo_pagos', tPago);
  }


  eliminarTipoPago(tPagoId: number) {
    return this._coreService.delete('pagos/tipo_pagos/' + tPagoId);
  }
  actualizarTipoPago(tPago: TipoPagoModel) {
    return this._coreService.put('pagos/tipo_pagos/' + tPago.id, tPago);
  }
}
