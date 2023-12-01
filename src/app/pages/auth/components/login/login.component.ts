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
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get usuarioField() {
    return this.formLogin.get('usuario');
  }
  get passwordField() {
    return this.formLogin.get('password');
  }

  onEnter(event) {
    if (event.keyCode === KEY_CODE_ENTER) {
      this.login();
    }
  }

  selectCompany(idActivationUser: number) {
    console.log('Select company ', idActivationUser);
    var data = {
      "idUserActive":idActivationUser
    };
    this._coreService.post<any>('auth/set_company', data).subscribe(res => {
      console.log('one ' + res)
      this.router.navigate(['dashboard']);
    });
  }

  login() {
    if (this.formLogin.valid || this.tokenService.getToken()) {
      this._coreService.login(
        this.formLogin.get('usuario').value,
        this.formLogin.get('password').value,
        (response: ActivationCompanyUserModel[]) => {
          console.log('two ', response);
          this.selectCompany(1);
          this._uiNotificationService.success("Inicio de session correcto");
          /*this._uiNotificationService.clearAll();
          if (response.length < 1) {
            this._uiNotificationService.error('No tiene un perfil activo');
          } else if (response.length === 1) {
            this.selectCompany(1);
            this._uiNotificationService.success("Inicio de session correcto");
          } else if (response.length > 1) {
            this.activationCompanyUsers = response;
            this._uiNotificationService.success("Inicio de session correcto");
          }*/
        },
        (e) => {
          if (e.status == 401 || e.status == 400) {
            this._uiNotificationService.clearAll();
            this._uiNotificationService.error("Usuario o contraseña invalida");
          }
        }
      );
    }
  }

  get showListCompanies() {
    return this.activationCompanyUsers.length > 1;
  }

  recoverPassword() {
    this._uiNotificationService.clearAll();
    this._uiNotificationService.success("Por favor comuníquese con el administrador.");
  }

}

