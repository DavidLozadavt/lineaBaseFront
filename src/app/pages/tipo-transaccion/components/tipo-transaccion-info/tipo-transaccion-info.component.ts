import { Component, Input, Output,EventEmitter } from '@angular/core';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';


@Component({
  selector: 'app-tipo-transaccion-info',
  templateUrl: './tipo-transaccion-info.component.html',
  styleUrls: ['./tipo-transaccion-info.component.scss']
})
export class TipoTransaccionInfoComponent {
  @Input() tipoTransaccion: TipoTransaccionModel;

  @Output() cerrar = new EventEmitter<void>();

  cerrarInfo(){
    this.cerrar.emit();
  }
}
