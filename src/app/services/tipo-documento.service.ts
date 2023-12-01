import { Injectable } from '@angular/core';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private url:string = 'documentos/tipo_documento/'
  constructor(
    private _coreService: CoreService
  ) { }

  public tipoDocument(data?: { relations?: string[], columns?: string[] }): Observable<TipoDocumentoModel | any> {
    return this._coreService.get<TipoDocumentoModel | any>('documentos/tipo_documento', data);

  }

  public traerTipoDocumentos(data?: { relations?: string[], columns?: string[] }): Observable<TipoDocumentoModel[] | any[]> {
    let url = this.url;
    url = !data 
    ? url
    : url+'?data_encoded='+JSON.stringify(data);
    return this._coreService.get<TipoDocumentoModel[] | any[]>(url);
  }


  crearTipoDocumento(data:{tipoDocumento: TipoDocumentoModel,relations?:string[],columns?:[]}) {
    return this._coreService.post<TipoDocumentoModel>(this.url, data);
  }


  eliminarTipoDocumento(tipoDocId: number) {
    let url=`${this.url}${tipoDocId}`;
    return this._coreService.delete(url);
  }
  actualizarTipoDocumento(data:{tipoDocumento: TipoDocumentoModel,relations?:string[],columns?:[]}) {
    return this._coreService.put<TipoDocumentoModel>(this.url + data.tipoDocumento.id, data);
  }
}
