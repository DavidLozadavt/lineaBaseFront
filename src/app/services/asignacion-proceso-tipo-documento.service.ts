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
    this.url = 'procesos/tipo_documento_proceso/';
  }

  traerTipoDocumentos(data?:{relations?:string[],columns?:string[],idProceso?:number,idTIpoDocumento?:number}):Observable<AsignacionProcesoTipoDocumentoModel[]|any[]>{
    let url = this.url;
    url = !data 
    ? url
    : url+'?data_encoded='+JSON.stringify(data);
    return this._coreService.get<AsignacionProcesoTipoDocumentoModel[]|any[]>(url);
  }

  asignarProcesoTipoDocumento(data:{asignaciones:AsignacionProcesoTipoDocumentoModel[],relations?:string[],columns?:[]}){    
    return this._coreService.post<AsignacionProcesoTipoDocumentoModel[]>(this.url,data);
  }
  reAsignarProcesoTipoDocumento(data:{asignacionProcesoTipoDocumento:AsignacionProcesoTipoDocumentoModel,relations?:string[],columns?:[]}){
    return this._coreService.put<AsignacionProcesoTipoDocumentoModel>(this.url+data.asignacionProcesoTipoDocumento.id,data);
  }
  desasignarTipoDocumento(idAsignacion:number){
    return this._coreService.delete(this.url+idAsignacion);
  }
}
