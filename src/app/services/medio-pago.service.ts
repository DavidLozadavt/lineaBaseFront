import { Injectable } from '@angular/core';
import { MedioPagoModel } from '@models/medio-pago.model';
import { CoreService } from './core.service';
@Injectable({
  providedIn: 'root'
})
export class MedioPagoService {

  medioPagoModel: MedioPagoModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerMedioPagos() {
    return this._coreService.get<MedioPagoModel[]>('pagos/medio_pagos');
  }
  public getMedioPagosById(id) {
    return this._coreService.get<MedioPagoModel>('pagos/medio_pagos/' + id);
  }

  crearMedioPago(mPago: MedioPagoModel) {
    return this._coreService.post<MedioPagoModel>('pagos/medio_pagos', mPago);
  }


  eliminarMedioPago(mPagoId: number) {
    return this._coreService.delete('pagos/medio_pagos/' + mPagoId);
  }
  actualizarMedioPago(mPago: MedioPagoModel) {
    return this._coreService.put('pagos/medio_pagos/' + mPago.id, mPago);
  }
}
