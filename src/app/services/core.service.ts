import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@models/auth.model';
import { CompanyModel } from '@models/company.model';
import { PersonaModel } from '@models/persona.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { TokenService } from './TokenService';
import { tap, map, catchError } from 'rxjs/operators';
import { UINotificationService } from '@services/uinotification.service';

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
    private _iuNotification: UINotificationService
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

      this.persona.next(auth.persona);

      this.post<any>('auth/set_company').subscribe(
        response => {
          const permissions = response.payload.permissions;
          const resultString = permissions.join(', ');
          this.permissions.next(resultString);
        },
        error => {
          this._iuNotification.error("Error al actualizar permisos", "Error de permisos")
        }
      );

      this.post<any>('auth/active_users').pipe(
        // tap(responseArray => console.log('New data ', responseArray)),
        map(responseArray => responseArray && responseArray.length > 0 ? responseArray[0] : null),
        tap(firstObject => {
          if (firstObject && firstObject.company) {
            const company = firstObject.company;
            this.empresa.next(company);
          } else {
            console.error('La propiedad "company" no está presente en el primer objeto.');
          }
        }),
        catchError(error => {
          console.error('Error al obtener datos de usuarios activos:', error);
          return [];
        })
      ).subscribe();

    }, (error: any) => {
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
