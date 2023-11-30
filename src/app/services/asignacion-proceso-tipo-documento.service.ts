import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';
import { AsignacionProcesoTipoDocumentoModel } from '@models/asignacion-proceso-tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class AsignacionProcesoTipoDocumentoService {

  private url:string;
  constructor(
    private _coreService:CoreService
  ) { 
    this.url = 'procesos/tipo_documento_proceso';
  }

  traerTipoDocumentos(data?:{relations?:string[],columns?:string[],idProceso?:number,idTIpoDocumento?:number}):Observable<AsignacionProcesoTipoDocumentoModel[]|any[]>{
    let url = this.url;
    url = !data 
    ? url
    : url+'?data_encoded='+JSON.stringify(data);
    return this._coreService.get<AsignacionProcesoTipoDocumentoModel[]|any[]>(url);
  }
}
