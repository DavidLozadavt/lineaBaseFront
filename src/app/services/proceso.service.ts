import { Injectable } from '@angular/core';
import { ProcesoModel } from '@models/proceso.model';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private url:string;

  constructor(
    private _coreService: CoreService
  ) {
    this.url='procesos/proceso/'
   }

  public traerProcesos(data?: { relations?: string[], columns?: string[] }): Observable<ProcesoModel[] | any[]> {
    let url = this.url;
    url = !data 
    ? url
    : url+'?data_encoded='+JSON.stringify(data);
    return this._coreService.get<ProcesoModel[] | any[]>(url);
  }
  
  crearProceso(data:{proceso: ProcesoModel,relations?:string[],columns?:[]}) {
    data.proceso.nombreProceso = data.proceso.nombreProceso.toUpperCase();
    data.proceso.descripcion = data.proceso.descripcion.toLowerCase();
    return this._coreService.post<ProcesoModel>(this.url, data);
  }


  eliminarProceso(procesoId: number) {
    return this._coreService.delete(this.url + procesoId);
  }
  actualizarProceso(data:{proceso: ProcesoModel,relations?:string[],columns?:[]}) {
    data.proceso.nombreProceso = data.proceso.nombreProceso.toUpperCase();
    data.proceso.descripcion = data.proceso.descripcion.toLowerCase();
    return this._coreService.put<ProcesoModel>(this.url+ data.proceso.id,data);
  }
}
