import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MedioPagoModel } from '@models/medio-pago.model';

@Component({
  selector: 'app-list-medio-pago',
  templateUrl: './list-medio-pago.component.html',
  styleUrls: ['./list-medio-pago.component.scss']
})
export class ListMedioPagoComponent {

  @Input() medioPagos: MedioPagoModel[] = [];

  @Output() update: EventEmitter<MedioPagoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  actualizar(medioPago: MedioPagoModel) {
    this.update.emit(medioPago);
  }

  eliminar(idmedioPago: number) {
    this.delete.emit(idmedioPago);
  }

  agregar() {
    this.create.emit();
  }

}
