import { Component, OnInit } from '@angular/core';
import { RolModel } from '@models/rol.model';
import { RolesService } from '@services/roles.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  private showModalRol = false;

  rol: RolModel = null;
  roles: RolModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _rolService: RolesService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this._rolService.getRoles()
      .subscribe(roles => {
        this.roles = roles;
      }, error => {        
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarRol(rolId: number) {
    this._rolService.eliminarRol(rolId).subscribe(() => {
      this.getRoles();
      this._uiNotificationService.success("Rol eliminado exitosamente", "Rol");
    }, (error) => {
      this._uiNotificationService.error("Ha ocurrido un error, intentalo más tarde.", "Ups");
    })
  }

  actualizarRol(rol: RolModel) {
    this.rol = rol;
    this.showModalRol = true;
  }

  createRol() {
    this.rol = null;
    this.showModalRol = true;
  }

  guardarRol(rol: RolModel) {
    if (rol.id) {
      this._rolService.actualizarRol(rol).subscribe(rol => {
        this.getRoles();
        this.reset();
        this._uiNotificationService.success("Rol actualizado exitosamente", "Rol");
      }, (error) => {
        if (error.status === 422 && error.error.errors) {
          this._uiNotificationService.error("No puedes crear un nombre que tenga 3 caracteres o más de veinte con carecteres especiales", "Error");
        } else this._uiNotificationService.error("Ha ocurrido un error inesperado, intentalo más tarde.", "Ups");

      });
    } else {
      this._rolService.crearRol(rol).subscribe(rol => {
        this.getRoles();
        this.reset();
        this._uiNotificationService.success("Rol creado exitosamente", "Rol");
      }, (error) => {
        if (error.status === 422 && error.error.errors) {
          this._uiNotificationService.error("No puedes crear un nombre que tenga 3 caracteres o más de veinte con carecteres especiales", "Error");
        } else this._uiNotificationService.error("No puede crear un rol que ya está en uso, por favor intenta con uno diferente.", "Error");
      })
    }
  }

  reset() {
    this.rol = null;
    this.showModalRol = false;
  }
}
