import { Component, OnInit } from '@angular/core';
import { TipoPagoModel } from '@models/tipo-pago.model';
import { TipoPagoService } from '@services/tipo-pago.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss']
})
export class TipoPagoComponent implements OnInit {

  protected showModalTipoPago = false;

  tipoPago: TipoPagoModel = null;
  tipoPagos: TipoPagoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoPagoService: TipoPagoService
  ) { }

  ngOnInit(): void {
    this.getTipoPago();
  }

  getTipoPago() {
    this._tipoPagoService.traerTipoPagos()
      .subscribe(tipoPago => {
        this.tipoPagos = tipoPago;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarTipoPago(tipoPagoId: number) {
    this._tipoPagoService.eliminarTipoPago(tipoPagoId).subscribe(() => {
      this.getTipoPago();
      this._uiNotificationService.success('Tipo de pago eliminado exitosamente!!!', 'Tipo de pago');
    }, (error: any) => {
      this._uiNotificationService.error('No puedes eliminar este tipo de pago', 'Tipo de pago');
    });
  }

  actualizarTipoPago(tipoPago: TipoPagoModel) {
    this.tipoPago = tipoPago;
    this.showModalTipoPago = true;
  }

  createTipoPago() {
    this.tipoPago = null;
    this.showModalTipoPago = true;
  }

  guardarTipoPago(tipoPago: TipoPagoModel) {
    if (tipoPago.id) {
      this._tipoPagoService.actualizarTipoPago(tipoPago).subscribe(tipoPago => {
        this.getTipoPago();
        this.reset();
        this._uiNotificationService.success('Tipo de pago actualizado exitosamente!!!', 'Tipo de pago');
      });
    } else {
      this._tipoPagoService.crearTipoPago(tipoPago).subscribe(rol => {
        this.getTipoPago();
        this.reset();
        this._uiNotificationService.success('Tipo de pago creado exitosamente!!!', 'Tipo de pago');
      })
    }
  }

  reset() {
    this.tipoPago = null;
    this.showModalTipoPago = false;
  }

}
