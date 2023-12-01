import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@models/auth.model';
import { CompanyModel } from '@models/company.model';
import { PersonaModel } from '@models/persona.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ActivationCompanyUserModel } from '../models/activation-company-user.model';
import { environment } from './../../environments/environment';
import { TokenService } from './TokenService';
import { PermisosService } from './permisos.service';
import { map } from 'rxjs/operators';

const API_URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public persona: BehaviorSubject<PersonaModel> = new BehaviorSubject<PersonaModel>(null);
  public empresa: BehaviorSubject<CompanyModel> = new BehaviorSubject<CompanyModel>(null);
  public permissions: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private httpClient: HttpClient,
    private _router: Router,
    private tokenService: TokenService,
    // private permissionService: PermisosService
  ) { }

  public get<T>(url: String, data: String | Object = ""): Observable<T> {
    return this.httpClient.get<T>(
      API_URL + url + this.getData(data),
      this.getConfig()
    );
  }

  private getConfig() {

    const header = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    }

    console.log('Header ', header)

    return { withCredentials: true, headers: new HttpHeaders(header) };
  }

  public post<T>(url: String, data: Object | FormData = {}): Observable<T> {
    return this.httpClient.post<T>(
      API_URL + url,
      data,
      this.getConfig()
    );
  }

  public put<T>(url: String, data: any = {}): Observable<T> {
    if (typeof (data.append) === "function") {
      data.append('_method', "PUT");
    } else {
      data._method = "PUT";
    }
    return this.httpClient.post<T>(API_URL + url, data, this.getConfig());
  }

  public delete(url: String) {
    return this.httpClient.delete(API_URL + url, this.getConfig());
  }

  login(user: string, password: string, success: CallableFunction, error: CallableFunction) {
    this.post<any>('auth/login', {
      email: user,
      password: password
    }).subscribe(
      (response: any) => {
        console.log(response)
        const token = response.access_token;
        this.tokenService.setToken(token);
        success(response);
      },
      (err) => {
        error(err);
      }
    );
  }



  public getUserAuthenticated() {
    this.post<AuthModel>('auth/user').subscribe(auth => {
      console.log('AUTH ', auth.persona)

      this.persona.next(auth.persona);

      const idUserActive = {
        "idUserActive": auth.persona.id
      };

      this.post<any>('auth/set_company', idUserActive).subscribe(permissions => {
        const resultString = permissions.join(', ');
        this.permissions.next(resultString);
      });

      var company = {
        created_at: "2023-11-03T09:43:42.000000Z",
        digitoVerificacion: 65535,
        id: 1,
        nit: "12132312312312",
        principal_id: null,
        razonSocial: "FUNDACION UNIVERSITARIA DE POPAYÁN",
        representanteLegal: "Mr. Leonel Romaguera",
        rutaLogo: "/default/logo.jpg",
        rutaLogoUrl: "http://localhost:8000/default/logo.jpg",
        updated_at: "2023-11-03T09:43:42.000000Z"
      }

      this.post<any>('auth/active_users').subscribe(companies => {
        console.log(companies[0]);
        this.empresa.next(company);
      });

      // this.empresa.next(company);
    }, errs => {
      this.logout();
    });
  }

  logout() {
    this.persona.next(null);
    this.empresa.next(null);
    this.permissions.next('');

    this.post('auth/logout').subscribe(res => {
      this._router.navigate(['/login']);
    }, err => {
      this._router.navigate(['/login']);
    });
  }

  private getData(data: String | Object): String {
    let dataUrl = "?";
    if (typeof (data) === "string") {
      if (data.trim() == '') {
        return '';
      }
      dataUrl += data;
    } else {
      const keys = Object.keys(data);
      keys.forEach((key, index) => {
        if (index > 0) {
          dataUrl += "&";
        }
        dataUrl += `${key}=${data[key]}`;
      });
    }
    return dataUrl.replace("??", "?").trim();
  }
}
