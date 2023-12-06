import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoPagoModel } from '@models/tipo-pago.model';

@Component({
  selector: 'app-list-tipo-pago',
  templateUrl: './list-tipo-pago.component.html',
  styleUrls: ['./list-tipo-pago.component.scss']
})
export class ListTipoPagoComponent {

  @Input() tipoPagos: TipoPagoModel[] = [];

  @Output() update: EventEmitter<TipoPagoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  actualizar(tipoPago: TipoPagoModel) {
    this.update.emit(tipoPago);
  }

  eliminar(idTipoPago: number) {
    this.delete.emit(idTipoPago);
  }

  agregar() {
    this.create.emit();
  }

}
