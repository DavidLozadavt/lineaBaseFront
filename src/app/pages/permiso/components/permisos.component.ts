import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EmpresaModel } from '@models/empresa.model';
// import { FuncionalidadService } from '@services/funcionalidad.service';
import { PermisoModel } from '@models/permiso.model';
import { RolModel } from '@models/rol.model';
import { EmpresaService } from '@services/empresa.service';
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
  empresas: EmpresaModel[] = [];
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
    // private funcionalidadService: FuncionalidadService,
    private menuService: MenuService,
    private empresaService: EmpresaService,
    private formBuilder: UntypedFormBuilder,
    private permisosService: PermisosService,
    private _uiNotificationService: UINotificationService
  ) {
    this.fun = new Array();
    // this.permisions = new Array();
    this.enviarNumeroRegistros(10);

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
    });

  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }


  traerEmpresas() {
    this.empresaService.traerEmpresas().subscribe((data: any) => {
      this.empresas = data;


    },
      error => {
        console.log('There was an error while retrieving data !!!', error);
      });
  }
  traerfunc() {
    this.permisosService.traerPermisos().subscribe((data: any) => {
      this.func = data;
      console.log(this.func, 'funcionalidades')

    },
      error => {
        console.log('There was an error while retrieving data !!!', error);
      });
  }


  menusByrol() {
    this.permissionsByrole();
  }

  findRoles() {
    this.menuService.findRoles().subscribe((data: any[]) => {

      console.log(data, 'findRoles');
    },
      error => {
        console.log('There was an error while retrieving data !!!', error);
      });

  }

  rolesByCompany() {
    this.rolService.rolByCompany(document.getElementById('company')['value']).subscribe((data: any) => {

      this.objRol = data;
      console.log(data, 'menu permi');

    },
      error => {
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
      console.log(this.menus, 'menu permi');

      console.log(this.permisions, 'data permisions');

    },
      error => {
        console.log('There was an error while retrieving data !!!', error);
      });
  }

  form: UntypedFormGroup = new UntypedFormGroup({

    rol: new UntypedFormControl('', Validators.required),
    company: new UntypedFormControl('', Validators.required),
  });


  guardarPermiso() {

    this.fun = this.menus.filter(m => m.checked).map(menu => menu.id);
    console.log(this.fun, ' fun nuevo');
    if (this.fun.length !== 0) {

      if (this.form.valid) {
        const obj: any = new Object();
        obj.idRol = this.form.value.rol;
        // obj.idRol = 1;
        obj.funciones = this.fun;
        // console.log(obj);
        this.permisosService.guardar(obj).subscribe((data: any) => {
          console.log(data, 'bien')

          this._uiNotificationService.success('Se guardo la configuración exitosamente ');
          this.form.reset();
          this.fun = [];
          this.menus = [];
          // window.location.reload();
        },
          error => {
            console.log('There was an error while retrieving data !!!', error);
          });
      } else {
        // this.alerts.push({
        //   type: 'danger',
        //   msg: 'Debe seleccionar un rol',
        //   timeout: 3000,
        //   msgStr: 'Error!'
        // });
        // alert('Por favor revise los campos');
        this._uiNotificationService.error('Debe seleccionar un rol');
      }
    } else {
      // this.alerts.push({
      //   type: 'danger',
      //   msg: 'No hay Cambios',
      //   timeout: 3000,
      //   msgStr: 'Error!'
      // });

      this._uiNotificationService.error('No hay Cambios');
    }


  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  get rol() { return this.form.get('rol') }



}


