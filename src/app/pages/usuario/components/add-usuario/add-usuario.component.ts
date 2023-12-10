import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '@models/usuario.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { IMyDpOptions } from 'mydatepicker';
import { isControlValid, isControlInvalid, containsOnlyNumbers, convertInputToUppercase, isStrongPassword } from '@components/validations/inputs';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss']
})
export class AddUsuarioComponent implements OnInit {

  @Input() usuarioNew: UsuarioModel;//actualizar

  @Output() store: EventEmitter<UsuarioModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formUsuario: UntypedFormGroup;
  confirmC: boolean = false;

  isValidIdentificacion: boolean = false;
  isInvalidIdentificacion: boolean = false;

  isValidNombre1: boolean = false;
  isInvalidNombre1: boolean = false;

  isValidNombre2: boolean = false;
  isInvalidNombre2: boolean = false;

  isValidApellido1: boolean = false;
  isInvalidApellido1: boolean = false;

  isValidApellido2: boolean = false;
  isInvalidApellido2: boolean = false;

  isValidEmail: boolean = false;
  isInvalidEmail: boolean = false;

  isValidCelular: boolean = false;
  isInvalidCelular: boolean = false;

  isValidPassword: boolean = false;
  isInvalidPassword: boolean = false;

  isValidConfirmPassword: boolean = false;
  isInvalidConfirmPassword: boolean = false;

  formOptions: AbstractControlOptions = { validators: this.passwordMatchValidator.bind(this) };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.usuarioNew = {
      id: null,
      email: '',
      contrasena: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setProceso()
    this.setupPasswordValidators();
  }

  public fechaNac: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    dayLabels: {
      su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mié', th: 'Jue', fr: 'Vie', sa: 'Sáb'
    },
    monthLabels: {
      1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
    },
    todayBtnTxt: 'Hoy',
    showTodayBtn: true,
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
    if (this.usuarioNew) {
      this.formUsuario.patchValue({
        email: this.usuarioNew.email,
        contrasena: this.usuarioNew.contrasena
      })
    }
  }

  private buildForm() {
    this.formUsuario = this.formBuilder.group({
      id:                  [0],
      email:               ['', [Validators.required,     Validators.minLength(8),  Validators.maxLength(50), this.emailValidation]],
      contrasena:          ['', [Validators.required,     Validators.minLength(8),  Validators.maxLength(20)]],
      confirmarContrasena: ['', [Validators.required,     Validators.minLength(8),  Validators.maxLength(20)]],
      identificacion:      ['', [Validators.required,     Validators.minLength(6),  Validators.maxLength(20)]],
      nombre1:             ['', [Validators.required,     Validators.minLength(2),  Validators.maxLength(10), Validators.pattern(/^[A-Za-z\s]+$/)]],
      nombre2:             ['', [Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^[A-Za-z\s]+$/)]],
      apellido1:           ['', [Validators.required,     Validators.minLength(2),  Validators.maxLength(10), Validators.pattern(/^[A-Za-z\s]+$/)]],
      apellido2:           ['', [Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^[A-Za-z\s]+$/)]],
      fechaNac:            ['', [Validators.required ]],
      celular:             ['', [Validators.required,     Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
    }, this.formOptions);

    this.formUsuario.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  emailValidation(control: AbstractControl) {
    const email = control.value;
    if (email && !email.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  }

  private passwordMatchValidator(g: FormGroup) {
    const contrasena = g.get('contrasena')?.value;
    const confirmarContrasena = g.get('confirmarContrasena')?.value;
  
    return contrasena === confirmarContrasena ? null : { mismatch: true };
  }
  

  private setupPasswordValidators(): void {
    const contrasenaControl = this.formUsuario.get('contrasena');
    const confirmarContrasenaControl = this.formUsuario.get('confirmarContrasena');
  
    contrasenaControl.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]);
  
    confirmarContrasenaControl.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      this.passwordMatchValidator.bind(this.formUsuario), // Llama a la función con el contexto del formulario
    ]);
  
    // Actualiza el estado de los controles
    contrasenaControl.updateValueAndValidity();
    confirmarContrasenaControl.updateValueAndValidity();
  } 

  guardarUsuario() {
    if (this.formUsuario.valid) {
      console.log(this.getUsuario())
      this.store.emit(this.getUsuario());
    } else {
      this._uiNotificationService.error("Por favor, completa correctamente el formulario", "Error");
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
      id: this.usuarioNew?.id,
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

  get identificacionField() {
    return this.formUsuario.get('identificacion');
  }

  onIdentificacionInputChange(event: any): void {
    const inputElement = event.target;
    let inputValue = inputElement.value;
  
    const sanitizedValue = inputValue.replace(/e/gi, '');
    this.identificacionField.setValue(sanitizedValue);
  
    if ((sanitizedValue.length >= 6 && sanitizedValue.length <= 20) && /^\d+$/.test(sanitizedValue)) {
      this.isValidIdentificacion = containsOnlyNumbers(this.identificacionField);
      this.isInvalidIdentificacion = !this.isValidIdentificacion;
    } else {
      this.isValidIdentificacion = false;
      this.isInvalidIdentificacion = true;
    }
  }

  get nombre1Field() {
    return this.formUsuario.get('nombre1');
  }

  onNombre1InputChange(event: any): void {
    convertInputToUppercase('nombre1', this.formUsuario, event);
    this.isValidNombre1 = isControlValid(this.nombre1Field)
    this.isInvalidNombre1 = isControlInvalid(this.nombre1Field)
  }

  get nombre2Field() {
    return this.formUsuario.get('nombre2');
  }

  onNombre2InputChange(event: any): void {
    convertInputToUppercase('nombre2', this.formUsuario, event);
    this.isValidNombre2 = isControlValid(this.nombre2Field);
    this.isInvalidNombre2 = isControlInvalid(this.nombre2Field);
  }

  get apellido1Field() {
    return this.formUsuario.get('apellido1');
  }

  onApellido1InputChange(event: any): void {
    convertInputToUppercase('apellido1', this.formUsuario, event);
    this.isValidApellido1 = isControlValid(this.apellido1Field);
    this.isInvalidApellido1 = isControlInvalid(this.apellido1Field);
  }

  get apellido2Field() {
    return this.formUsuario.get('apellido2');
  }

  onApellido2InputChange(event: any): void {
    convertInputToUppercase('apellido2', this.formUsuario, event);
    this.isValidApellido2 = isControlValid(this.apellido2Field);
    this.isInvalidApellido2 = isControlInvalid(this.apellido2Field);
  }

  get fechaNacField() {
    return this.formUsuario.get('fechaNac');
  }

  onFechaNacInputChange(event: any): void {
    const fechaNacimientoValue = this.fechaNacField?.value || '';
    convertInputToUppercase(fechaNacimientoValue, this.formUsuario, event);
  }

  get celularField() {
    return this.formUsuario.get('celular');
  }

  onCelularInputChange(event: any): void {
    const inputElement = event.target;
    let inputValue = inputElement.value;

    const sanitizedValue = inputValue.replace(/e/gi, '');
    this.celularField.setValue(sanitizedValue);

    if (sanitizedValue.length === 10 && /^\d{10}$/.test(sanitizedValue)) {
      this.isValidCelular = containsOnlyNumbers(this.celularField);
      this.isInvalidCelular = !this.isValidCelular;
    } else {
      this.isValidCelular = false;
      this.isInvalidCelular = true;
    }
  }

  get emailField() {
    return this.formUsuario.get('email');
  }

  onEmailInputChange(event: any): void {
    convertInputToUppercase('email', this.formUsuario, event);
    this.isValidEmail = isControlValid(this.emailField);
    this.isInvalidEmail = isControlInvalid(this.emailField);
  }

  get contrasenaField() {
    return this.formUsuario.get('contrasena');
  }

  onPasswordInputChange(event: any): void {
    const passwordValue = this.contrasenaField.value;
    this.isValidPassword = isStrongPassword(passwordValue);
    this.isInvalidPassword = !this.isValidPassword && (this.contrasenaField.dirty || this.contrasenaField.touched);
  }

  get contrasenaConfirmField() {
    return this.formUsuario.get('confirmarContrasena');
  }

  onPasswordConfirmInputChange(event: any): void {
    const passwordConfirmValue    = this.contrasenaConfirmField.value;
    this.isValidConfirmPassword   = passwordConfirmValue === this.contrasenaField.value;
    this.isInvalidConfirmPassword = !this.isValidConfirmPassword && (this.contrasenaConfirmField.dirty || this.contrasenaConfirmField.touched);
  }

}
