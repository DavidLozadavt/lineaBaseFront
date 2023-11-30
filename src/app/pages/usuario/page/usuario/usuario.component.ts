import { Component, OnInit } from '@angular/core';
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

  private showModalUsuario = false;
  private showModalAsignacion = false;

  usuario: UsuarioModel = null;
  usuarios: UsuarioModel[] = [];
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
        this.usuarios = usuarios;
        this.rolesByCompany();
        console.log('user', this.usuarios)
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  rolesByCompany() {
    this._rolService.rolByCompany(this.usuarios[0].idCompany).subscribe((data: any) => {
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

  asignarRol(usuario: UsuarioModel) {
    console.log(usuario, 'el usuario')
    this.rolUser = [];
    usuario.roles.map(u => {
      this.rolUser.push(u);
      console.log(this.rolUser, 'nuevo rol ')
    })
    this.roles = this.roles.map(haveRoles => {
      haveRoles.checked = (this.rolUser.findIndex(p => p.name === haveRoles.name) !== -1)
      return haveRoles;
    });
    this.usuario = usuario;
    this.showModalAsignacion = true;
  }

  guardarAsignacion(roles: any) {
    console.log('aqui', roles);
    this._usuarioService.asignarRoles(roles).subscribe((data: any) => {
      console.log(data, 'bien')
      this.getUsuarios();
      this.showModalAsignacion = false;
      this._uiNotificationService.success('Se guardo la configuración exitosamente ');
      // window.location.reload();
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
      this._usuarioService.crearUsuario(usuario).subscribe(usuario => {
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
