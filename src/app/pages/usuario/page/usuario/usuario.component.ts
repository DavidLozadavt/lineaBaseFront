import { Component, OnInit } from '@angular/core';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';
import { RolModel } from '@models/rol.model';
import { UsuarioModel } from '@models/usuario.model';
import { RolesService } from '@services/roles.service';
import { UINotificationService } from '@services/uinotification.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  protected showModalUsuario = false;
  protected showModalAsignacion = false;

  usuario: ActivationCompanyUserModel = null;
  usuarios: ActivationCompanyUserModel[] = [];
  userRoles: any[] = [];
  roles: any[] = [];
  rolUser: RolModel[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _usuarioService: UsuarioService,
    private _rolService: RolesService
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this._usuarioService.traerUsuarios()
      .subscribe(usuarios => {
        console.log(usuarios)
        this.usuarios = usuarios;
        this.rolesByCompany();
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  rolesByCompany() {
    this._rolService.rolesByCompany().subscribe((data: any) => {
      this.roles = data;
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  eliminarUsuarios(userId: number) {
    this._usuarioService.eliminarUsuario(userId).subscribe(() => {
      this.getUsuarios();
    })
  }

  asignarRol(usuario: ActivationCompanyUserModel) {
    this.rolUser = [];
    usuario.roles.map(u => {
      this.rolUser.push(u);
    })
    this.roles = this.roles.map(haveRoles => {
      haveRoles.checked = (this.rolUser.findIndex(p => p.name === haveRoles.name) !== -1)
      return haveRoles;
    });
    this.usuario = usuario;
    this.showModalAsignacion = true;
  }

  guardarAsignacion(roles: any) {
    this._usuarioService.asignarRoles(roles).subscribe((data: any) => {
      this.getUsuarios();
      this.showModalAsignacion = false;
      this._uiNotificationService.success('Se guardo la configuración exitosamente ');
    }, (error) => {
      console.log(error)
      this._uiNotificationService.error('Error al guardar');
    });
  }

  createUsuarios() {
    this.usuario = null;
    this.showModalUsuario = true;
  }

  guardarUsuarios(usuario: UsuarioModel) {
    if (usuario.id) {
      this._usuarioService.actualizarUsuario(usuario).subscribe(usuario => {
        this.getUsuarios();
        this.reset();
      });
    } else {
      this._usuarioService.crearUsuario(usuario).subscribe((usuario) => {
        this.getUsuarios();
        this.reset();
      })
    }
  }

  reset() {
    this.usuario = null;
    this.showModalUsuario = false;
  }

}
