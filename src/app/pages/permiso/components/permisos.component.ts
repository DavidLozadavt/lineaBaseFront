import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CompanyModel } from '@models/company.model';
import { PermisoModel } from '@models/permiso.model';
import { RolModel } from '@models/rol.model';
import { MenuService } from '@services/menu.service';
import { PermisosService } from '@services/permisos.service';
import { RolesService } from '@services/roles.service';
import { UINotificationService } from '@services/uinotification.service';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {
  pageActual: number = 1;
  objRol: RolModel[] = [];
  empresas: CompanyModel[] = [];
  public menus: any[];
  public permisions: any[];
  public func: PermisoModel[];
  public fun: number[];
  public roles: number[];
  formMenu: UntypedFormGroup;
  numReg: number;
  alerts: any[] = [];
  constructor(
    private rolService: RolesService,
    private menuService: MenuService,
    private permisosService: PermisosService,
    private _uiNotificationService: UINotificationService
  ) {
    this.fun = new Array();
    this.enviarNumeroRegistros(5);
  }

  ngOnInit(): void {
    this.rolesByCompany();
    this.traerfunc();
    this.permisosService.traerPermisos().subscribe((data: any) => {
      this.menus = data;
    }, error => {
      console.log(error, "error in OnInit");
    });
  }

  /**
   * Return value int
   * @param param Event or number
   */
  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  traerfunc() {
    this.permisosService.traerPermisos().subscribe((data: any) => {
      this.func = data;
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  menusByrol() {
    this.permissionsByrole();
  }

  findRoles() {
    this.menuService.findRoles().subscribe((data: any[]) => {
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  rolesByCompany() {
    this.rolService.rolesByCompany().subscribe((data: any) => {
      this.objRol = data;
      console.log(data, 'roles by company');
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  permissionsByrole() {
    this.permisions = [];
    this.permisosService.permissionsRole(document.getElementById('rol')['value']).subscribe((data: any) => {
      console.log(data);
      this.permisions = data;
      this.menus = this.menus.map(havePermission => {
        console.log(havePermission);
        havePermission.checked = (this.permisions.findIndex(p => p === havePermission.name) !== -1)
        return havePermission;
      });
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  form: UntypedFormGroup = new UntypedFormGroup({
    rol: new UntypedFormControl('', Validators.required),
  });

  guardarPermiso() {
    this.fun = this.menus.filter(m => m.checked).map(menu => menu.id);
    if (this.fun.length !== 0) {
      if (this.form.valid) {
        const obj: any = new Object();
        obj.idRol = this.form.value.rol;
        obj.funciones = this.fun;
        this.permisosService.guardar(obj).subscribe((data: any) => {
          console.log(data, 'bien')
          this._uiNotificationService.success('Se guardo la configuración exitosamente ');
          this.form.reset();
          this.fun = [];
          this.menus = [];
          // window.location.reload();
        }, (error) => {
          console.log('There was an error while retrieving data !!!', error);
        });
      } else {
        this._uiNotificationService.error('Debe seleccionar un rol');
      }
    } else {
      this._uiNotificationService.error('No hay Cambios');
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  get rol() { return this.form.get('rol') }

}