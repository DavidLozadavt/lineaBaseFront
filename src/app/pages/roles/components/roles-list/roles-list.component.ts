import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolModel } from '@models/rol.model';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent {

  @Input() roles: RolModel[] = [];

  @Output() update: EventEmitter<RolModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  actualizar(rol: RolModel) {
    this.update.emit(rol);
  }

  eliminar(idRol: number) {
    this.delete.emit(idRol);
  }

  agregar() {
    this.create.emit();
  }

}
