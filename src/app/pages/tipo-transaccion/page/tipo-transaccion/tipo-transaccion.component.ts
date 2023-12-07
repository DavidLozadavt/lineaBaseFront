import { Component, OnInit } from '@angular/core';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';
import { TipoTransaccionService } from '@services/tipo-transaccion.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-tipo-transaccion',
  templateUrl: './tipo-transaccion.component.html',
  styleUrls: ['./tipo-transaccion.component.scss']
})
export class TipoTransaccionComponent implements OnInit {

  protected showModalTipoT = false;

  tipoT: TipoTransaccionModel = null;
  tipoTs: TipoTransaccionModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoTService: TipoTransaccionService
  ) { }

  ngOnInit(): void {
    this.getTipoT();
  }

  getTipoT() {
    this._tipoTService.traerTipo_transaccion()
      .subscribe(tipoT => {
        this.tipoTs = tipoT;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarTipoT(tipoTId: number) {
    this._tipoTService.eliminarTipo_transaccion(tipoTId).subscribe(() => {
      this.getTipoT();
      this._uiNotificationService.success('Tipo de transacción eliminada exitosamente', 'Tipo transacción');
    }, (error) => {
      if (error.status === 500) {
        this._uiNotificationService.error("No puedes eliminar este tipo de transacción");
      }
    });
  }

  actualizarTipoT(tipoT: TipoTransaccionModel) {
    this.tipoT = tipoT;
    this.showModalTipoT = true;
  }

  createTipoT() {
    this.tipoT = null;
    this.showModalTipoT = true;
  }

  guardarTipoT(tipoT: TipoTransaccionModel) {
    if (tipoT.id) {
      this._tipoTService.actualizarTipo_transaccion(tipoT).subscribe(tipoT => {
        this.getTipoT();
        this.reset();
        this._uiNotificationService.success('Tipo de transacción actualizada exitosamente', 'Tipo transacción');
      });
    } else {
      this._tipoTService.crearTipoTransaccion(tipoT).subscribe(tipoT => {
        this.getTipoT();
        this.reset();
        this._uiNotificationService.success('Tipo de transacción creada exitosamente', 'Tipo transacción');
      })
    }
  }

  reset() {
    this.tipoT = null;
    this.showModalTipoT = false;
  }

}
