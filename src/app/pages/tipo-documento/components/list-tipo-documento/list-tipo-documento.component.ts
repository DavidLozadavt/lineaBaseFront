import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoDocumentoModel } from '@models/tipo-documento.model';

@Component({
  selector: 'app-list-tipo-documento',
  templateUrl: './list-tipo-documento.component.html',
  styleUrls: ['./list-tipo-documento.component.scss']
})
export class ListTipoDocumentoComponent {

  @Input() tipoDocumentos: TipoDocumentoModel[] = [];

  @Output() update: EventEmitter<TipoDocumentoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(event:any) {
    this.numReg = event.target.value;
  }

  actualizar(tipoDocumento: TipoDocumentoModel) {
    this.update.emit(tipoDocumento);
  }

  eliminar(idTipoDoc: number) {
    this.delete.emit(idTipoDoc);
  }

  agregar() {
    this.create.emit();
  }

}
