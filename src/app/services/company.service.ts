import { Injectable } from '@angular/core';
import { CompanyModel } from '@models/company.model';
// import { AsignarRolCompanyModel } from '@models/asignar-rol-empresa.model';
import { CoreService } from './core.service';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  empresa: CompanyModel;
  constructor(
    private _coreService: CoreService
  ) { }

  public traerEmpresaPrincipal() {
    return this._coreService.get<CompanyModel>('empresas/principal');

  }

  public traerEmpresas() {

    return this._coreService.get<CompanyModel[]>('list_companies');

  }

  public getImagenBase() {
    return this._coreService.get<any>('empresa-picture');

  }
  crearEmpresa(empresa: FormData) {
    return this._coreService.post<CompanyModel>('empresas', empresa);
  }

  eliminarEmpresa(empresaId: number) {
    return this._coreService.delete('empresas/' + empresaId);
  }

  actualizarEmpresa(empresa: FormData) {
    return this._coreService.put<CompanyModel>('empresas/' + empresa.get('id'), empresa);
  }
  
}
