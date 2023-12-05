import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CompanyModel } from '@models/company.model';
import { PermisoModel } from '@models/permiso.model';
import { RolModel } from '@models/rol.model';
import { CompanyService } from '@services/company.service';
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
    private _companyService: CompanyService,
    private permisosService: PermisosService,
    private _uiNotificationService: UINotificationService
  ) {
    this.fun = new Array();
    this.enviarNumeroRegistros(5);
  }

  ngOnInit(): void {
    console.log('traer empresas');
    this.traerEmpresas();
    console.log('traer func');
    this.traerfunc();
    this.permisosService.traerPermisos().subscribe((data: any) => {
      console.log('permisos', data)
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

  traerEmpresas() {
    this._companyService.traerEmpresas().subscribe((data: any) => {
      this.empresas = data;
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  traerfunc() {
    this.permisosService.traerPermisos().subscribe((data: any) => {
      this.func = data;
      console.log(this.func, 'funcionalidades')
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  menusByrol() {
    this.permissionsByrole();
  }

  findRoles() {
    this.menuService.findRoles().subscribe((data: any[]) => {
      console.log(data, 'findRoles');
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  /*rolesByCompany() {
    this.rolService.rolByCompany(document.getElementById('company')['value']).subscribe((data: any) => {
      this.objRol = data;
      console.log(data, 'roles by company');
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }*/

  rolesByCompany() {
    this.rolService.getRoles().subscribe((data: any) => {
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
      console.log(this.menus, 'permission permission');
      console.log(this.permisions, 'permissions by role');
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  form: UntypedFormGroup = new UntypedFormGroup({
    rol: new UntypedFormControl('', Validators.required),
    company: new UntypedFormControl('', Validators.required),
  });

  guardarPermiso() {
    this.fun = this.menus.filter(m => m.checked).map(menu => menu.id);
    console.log(this.fun, 'permission new');
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
          window.location.reload();
        },
          error => {
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


