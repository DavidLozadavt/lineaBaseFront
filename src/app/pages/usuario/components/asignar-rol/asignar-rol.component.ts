import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss']
})
export class AsignarRolComponent implements OnInit {

  @Output() asignation: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Input() roles: any[] = [];
  @Input() usuario: ActivationCompanyUserModel;
  rol: number[];

  numReg = 5;
  pageActual = 0;

  constructor() { }

  ngOnInit(): void { }

  closeModal() {
    this.cancel.emit();
  }

  asignarRol() {
    this.asignation.emit(this.getRoles());
  }

  getRoles() {
    return {
      roles: this.roles.filter(r => r.checked).map(rol => rol.id),
      idActivation: this.usuario.id
    }
  }

}
