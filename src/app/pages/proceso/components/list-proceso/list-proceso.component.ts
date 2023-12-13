import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcesoModel } from '@models/proceso.model';

@Component({
  selector: 'app-list-proceso',
  templateUrl: './list-proceso.component.html',
  styleUrls: ['./list-proceso.component.scss']
})
export class ListProcesoComponent {

  @Input() procesos: ProcesoModel[] = [];

  @Output() update: EventEmitter<ProcesoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() info: EventEmitter<number> = new EventEmitter();
  @Output() documentos: EventEmitter<ProcesoModel> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(event:any) {
    this.numReg = event.target.value;
  }

  actualizar(proceso: ProcesoModel) {
    this.update.emit(proceso);
  }

  eliminar(idProceso: number) {
    this.delete.emit(idProceso);
  }

  agregar() {
    this.create.emit();
  }

  getInfo(idProceso:number){
    let procesoIndex:number = this.procesos.findIndex((proceso)=>proceso.id == idProceso);
    this.info.emit(procesoIndex);
  }

  traerDocumentos(proceso:ProcesoModel){
    this.documentos.emit(proceso);
  }

}
