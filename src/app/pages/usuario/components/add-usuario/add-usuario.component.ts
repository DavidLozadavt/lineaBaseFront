import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '@models/usuario.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  @Input() usuario: UsuarioModel;//actualizar

  @Output() store: EventEmitter<UsuarioModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formUsuario: UntypedFormGroup;
  confirmC: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.usuario = {
      id: null,
      email: '',
      contrasena: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {

    this.setProceso()
  }

  public fechaNac: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    openSelectorOnInputClick: true,
    showInputField: true,
    inline: false,
    editableDateField: false,
    disableSince: {

      year: new Date().getFullYear(),
      month: new Date().getUTCMonth() + 1,
      day: new Date().getDate() + 1

    }

  };


  setProceso() {
    if (this.usuario) {
      this.formUsuario.patchValue({
        email: this.usuario.email,
        contrasena: this.usuario.contrasena
      })
    }
  }

  private buildForm() {
    this.formUsuario = this.formBuilder.group({
      id: [0],
      email: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      nombre1: ['', [Validators.required]],
      nombre2: ['',],
      apellido1: ['', [Validators.required]],
      apellido2: ['',],
      fechaNac: ['', [Validators.required]],
      celular: ['', [Validators.required]],
    });



    this.formUsuario.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }


  guardarUsuario() {
    var contrasena = document.getElementById('contrasena')['value'];
    var contrasenaConfirm = document.getElementById('confirmContrasena')['value'];
    if (contrasena == contrasenaConfirm) {
      this.store.emit(this.getUsuario());
    } else {
      this._uiNotificationService.error("Las contraseñas no coinciden");
    }
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formUsuario.controls[name];
  }

  getUsuario() {
    return {
      id: this.usuario?.id,
      email: this.getControl('email').value,
      contrasena: this.getControl('contrasena').value,
      identificacion: this.getControl('identificacion').value,
      nombre1: this.getControl('nombre1').value,
      nombre2: this.getControl('nombre2').value,
      apellido1: this.getControl('apellido1').value,
      apellido2: this.getControl('apellido2').value,
      fechaNac: this.getControl('fechaNac').value['formatted'],
      celular: this.getControl('celular').value,
      direccion: 'Sin registro',
      telefonoFijo: 'Sin registro',
      perfil: 'Sin registro',
      sexo: '-',
      rh: '-',
      idTipoIdentificacion: 1,
      idCiudad: 1,
      idCiudadNac: 1,
      idCiudadUbicacion: 1,
      rutaFoto: '/default/user.svg',

    }
  }

  get emailField() {
    return this.formUsuario.get('email');
  }

  get contrasenaField() {
    return this.formUsuario.get('contrasena');
  }

  get nombre1Field() {
    return this.formUsuario.get('nombre1');
  }

  get identificacionField() {
    return this.formUsuario.get('identificacion');
  }

  get nombre2Field() {
    return this.formUsuario.get('nombre2');
  }

  get apellido1Field() {
    return this.formUsuario.get('apellido1');
  }

  get apellido2Field() {
    return this.formUsuario.get('apellido2');
  }

  get fechaNacField() {
    return this.formUsuario.get('fechaNac');
  }

  get celularField() {
    return this.formUsuario.get('celular');
  }

}
