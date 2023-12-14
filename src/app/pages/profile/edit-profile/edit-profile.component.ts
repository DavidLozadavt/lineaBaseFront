import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { PersonaModel } from '@models/persona.model';
import { CiudadService } from '@services/ciudad.service';
import { CoreService } from '@services/core.service';
import { DepartamentoService } from '@services/departamento.service';
import { PersonaService } from '@services/persona.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  persona: PersonaModel = {
    apellido1: '',
    apellido2: '',
    identificacion: '',
    nombre1: '',
    nombre2: ''
  }

  frmPersona: UntypedFormGroup;
  departamentos: DepartamentoModel[];

  ciudadesNacimiento: CiudadModel[] = [];
  ciudades: CiudadModel[] = [];
  ciudadesUbicacion: CiudadModel[] = [];

  avatar: FileList = null;

  ciudadInitial: CiudadModel = {
    id: null,
    codigo: null,
    descripcion: null,
    departamento: null
  };

  constructor(
    private _coreService: CoreService,
    private _formBuilder: UntypedFormBuilder,
    private _departamentoService: DepartamentoService,
    private _ciudadService: CiudadService,
    private _personaService: PersonaService,
    private _router: Router
  ) {
    this.initFrmPersona();
    this._departamentoService.traerDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  initFrmPersona() {
    this.frmPersona = this._formBuilder.group({
      detalleTipoPago: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._coreService.persona.subscribe(persona => {
      this.persona = persona;
      this.initCiudadesNacimiento();
    });
  }

  equalsDepartments(ciudadUno: CiudadModel, ciudadDos: CiudadModel): Boolean {
    if (!ciudadUno || !ciudadDos) {
      return false;
    }

    if (!ciudadUno.departamento || !ciudadDos.departamento) {
      return false;
    }

    return (ciudadUno.departamento.id === ciudadDos.departamento.id);
  }

  initCiudades() {
    if (this.persona.ciudad) {
      if (this.equalsDepartments(this.persona.ciudad, this.persona.ciudadNac)) {
        this.ciudades = Object.assign([], this.ciudadesNacimiento);
        this.initCiudadesUbicacion();
      } else {
        this._ciudadService.ciudadesByDep(this.persona.ciudad.departamento.id)
          .subscribe(ciudades => {
            this.ciudades = ciudades;
            this.initCiudadesUbicacion();
          });
      }
    } else {
      this.initCiudadesUbicacion();
      this.persona.ciudad = Object.assign({}, this.ciudadInitial);
    }
  }

  initCiudadesUbicacion() {
    if (this.persona.ciudadUbicacion) {
      if (this.equalsDepartments(this.persona.ciudadUbicacion, this.persona.ciudadNac)) {
        this.ciudadesUbicacion = this.ciudadesNacimiento;
      } else if (this.equalsDepartments(this.persona.ciudadUbicacion, this.persona.ciudad)) {
        this.ciudadesUbicacion = this.ciudades;
      } else {
        this._ciudadService.ciudadesByDep(this.persona.ciudadUbicacion.departamento.id)
          .subscribe(ciudades => {
            this.ciudadesUbicacion = ciudades;
          });
      }
    } else {
      this.persona.ciudadUbicacion = Object.assign({}, this.ciudadInitial);
    }
  }

  initCiudadesNacimiento() {
    if (this.persona.ciudadNac) {
      this._ciudadService.ciudadesByDep(this.persona.ciudadNac.departamento.id)
        .subscribe(ciudades => {
          this.ciudadesNacimiento = ciudades;
          this.initCiudades();
        });
    } else {
      this.initCiudades();
      this.persona.ciudadNac = Object.assign({}, this.ciudadInitial);
    }
  }

  updateProfile() {
    this._personaService.updatePerson(this.persona, this.avatar).subscribe(persona => {
      this._coreService.getUserAuthenticated();
      this._router.navigate(['/perfil']);
    });
  }

  get nameFileFotoPerfil() {
    if (this.avatar && this.avatar[0]) {
      return this.avatar[0].name;
    }

    return "seleccione un archivo";
  }

  onFileChange(files: FileList) {
    this.avatar = files;
  }

  changeDepatamentoCiudadNacimiento(departamento: DepartamentoModel) {
    this._ciudadService.ciudadesByDep(departamento.id).subscribe(ciudades => {
      this.ciudadesNacimiento = ciudades;
    });
  }

  changeDepatamentoCiudadUbicacion(departamento: DepartamentoModel) {
    this._ciudadService.ciudadesByDep(departamento.id).subscribe(ciudades => {
      this.ciudadesUbicacion = ciudades;
    });
  }

  changeDepatamentoCiudades(departamento: DepartamentoModel) {
    this._ciudadService.ciudadesByDep(departamento.id).subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }

  compareCiudad(c1: CiudadModel, c2: CiudadModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareDepartamento(d1: DepartamentoModel, d2: DepartamentoModel): boolean {
    return d1 && d2 ? d1.id === d2.id : d1 === d2;
  }

}
