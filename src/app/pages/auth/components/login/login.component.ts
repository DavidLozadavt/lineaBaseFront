import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';
import { TokenService } from '@services/TokenService';
import { CoreService } from '@services/core.service';
import { UINotificationService } from '@services/uinotification.service';

const KEY_CODE_ENTER = 13;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: UntypedFormGroup;

  activationCompanyUsers: ActivationCompanyUserModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _coreService: CoreService,
    private router: Router,
    private _uiNotificationService: UINotificationService,
    private tokenService: TokenService
  ) {
    this._coreService.logout();
    this.buildFormLogin();
  }

  ngOnInit(): void { }

  private buildFormLogin() {
    this.formLogin = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), this.emailValidation]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  get usuarioField() {
    return this.formLogin.get('usuario');
  }

  get passwordField() {
    return this.formLogin.get('password');
  }

  emailValidation(control) {
    const email = control.value;
    if (email && !email.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  }

  onEnter(event) {
    if (event.keyCode === KEY_CODE_ENTER) {
      this.login();
    }
  }

  selectCompany(): void {
    this._coreService.post<any>('auth/set_company').subscribe(res => {
      this.tokenService.updateToken(res.new_token);
      this.router.navigate(['dashboard']);
    });
  }

  login(): void {
    if (this.formLogin.valid) {
      this.doLogin();
    } else {
      this._uiNotificationService.error("Por favor, Ingresa tus credenciales", "Error");
    }
  }

  doLogin(): void {
    this._coreService.login(
      this.usuarioField.value,
      this.passwordField.value,
      (response: ActivationCompanyUserModel[]) => {
        this.selectCompany();
        this._uiNotificationService.success("Inicio de sesión exitosamente", "Inicio de sesión");
      },
      (error) => {
        if (error.status == 401 || error.status == 400) {
          this._uiNotificationService.clearAll();
          this._uiNotificationService.error("Usuario o contraseña inválida", "Datos erroneos");
        } else {
          this._uiNotificationService.clearAll();
          this._uiNotificationService.error("Error al iniciar sesión. Por favor, intenta nuevamente.", "Error");
        }
      }
    );
  }

  recoverPassword() {
    this._uiNotificationService.clearAll();
    this._uiNotificationService.success("Por favor comuníquese con el administrador.", "Contraseña");
  }

}

