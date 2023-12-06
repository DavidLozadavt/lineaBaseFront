import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';
import { UsuarioModel } from '@models/usuario.model';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent {

  @Input() usuarios: ActivationCompanyUserModel[] = [];

  @Output() update: EventEmitter<UsuarioModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() asignation: EventEmitter<ActivationCompanyUserModel> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() { }

  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  actualizar(usuario: UsuarioModel) {
    this.update.emit(usuario);
  }

  eliminar(idUsuario: number) {
    this.delete.emit(idUsuario);
  }

  agregar() {
    this.create.emit();
  }

  asignar(usuario: ActivationCompanyUserModel) {
    this.asignation.emit(usuario);
  }

}
