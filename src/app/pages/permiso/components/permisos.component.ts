import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CompanyModel } from '@models/company.model';
import { RolModel } from '@models/rol.model';
import { PermisosService } from '@services/permisos.service';
import { RolesService } from '@services/roles.service';
import { UINotificationService } from '@services/uinotification.service';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  keyword = 'name'; // nombre por la que filtrar en el select
  pageActual: number = 1;
  objRol: RolModel[] = [];
  empresas: CompanyModel[] = [];
  public menus: any[];
  public permisions: any[];
  public fun: number[];
  public roles: number[];
  formMenu: UntypedFormGroup;
  numReg: number;
  alerts: any[] = [];

  constructor(
    private rolService: RolesService,
    private permisosService: PermisosService,
    private _uiNotificationService: UINotificationService
  ) {
    this.fun = new Array();
    this.enviarNumeroRegistros(5);
  }

  ngOnInit(): void {
    this.rolesByCompany();
    this.getPermissions();
  }

  onChangeSearch(val: string) {
  }

  onFocused(e) {
  }

  /**
   * Return value int
   * @param param Event or number
   */
  enviarNumeroRegistros(valor: string | number): void {
    this.numReg = typeof valor === 'string' ? parseInt(valor, 10) : valor;
  }

  menusByrolNumber(id: number) {
    this.form.controls['rol'].setValue(id);
    this.form.controls['rol'].markAsTouched();
    this.form.controls['rol'].updateValueAndValidity();
    this.permissionsByrole(id);
  }

  rolesByCompany() {
    this.rolService.rolesByCompany().pipe(
      map((data: any[]) => {
        return data.map(item => ({ id: item.id, name: item.name }));
      })
    ).subscribe((transformedData: any[]) => {
      this.objRol = transformedData;
      console.log(transformedData, 'roles by company');
    }, (error) => {
      console.log('There was an error while retrieving data !!!', error);
    });
  }

  getPermissions() {
    this.permisosService.traerPermisos().subscribe((data: any) => {
      this.menus = data;
    }, error => {
      console.log(error, "Errors in get permissions");
    });
  }

  permissionsByrole(id: number) {
    this.permisions = [];
    this.permisosService.permissionsRole(id).subscribe((data: any) => {
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
        }, (error) => {
          console.log('There was an error while retrieving data !!!', error);
        });
      } else {
        this._uiNotificationService.error('Debe seleccionar un rol');
      }
    } else {
      this._uiNotificationService.error('No puedes desasignar todos los permisos a este rol', 'Permisos');
    }
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  get rol() { return this.form.get('rol') }

}