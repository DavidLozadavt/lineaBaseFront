import { Injectable } from '@angular/core';
import { ProcesoModel } from '@models/proceso.model';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  proceso: ProcesoModel;
  permisos: number;
  url:string;

  constructor(
    private _coreService: CoreService
  ) {
    this.url='procesos/proceso'
   }

  public traerProcesos(data?: { relations?: string[], columns?: string[] }): Observable<ProcesoModel[] | any[]> {
    let url = this.url;
    url = !data 
    ? url
    : url+'?data_encoded='+JSON.stringify(data);
    return this._coreService.get<ProcesoModel[] | any[]>(url);
  }
  
  public slider() {
    return this._coreService.get('slider');
  }

  public procesosByRolUsuario(idRol: number) {
    const idrol = idRol;
    this.permisos = idRol;
    return this._coreService.post('traerprocesossusuario', idrol);
  }

  public procesosByNombre(nombre: string) {
    const name = nombre.toUpperCase();
    return this._coreService.get('procesos?nombreProceso=' + name);
  }

  public procesosByRol(idRol: number) {
    const idrol = idRol;
    this.permisos = idRol;
    return this._coreService.post('traerprocesos', idrol);
  }

  public info(idRol: number) {
    const idrol = idRol;
    this.permisos = idRol;
    return this._coreService.post('permisos', idrol);
  }

  crearProceso(proceso: ProcesoModel) {

    proceso.nombreProceso = proceso.nombreProceso.toUpperCase();
    proceso.descripcion = proceso.descripcion.toUpperCase();
    return this._coreService.post<ProcesoModel>('procesos', proceso);
  }


  eliminarProceso(procesoId: number) {
    return this._coreService.delete('procesos/' + procesoId);
  }
  actualizarProceso(proceso: ProcesoModel) {
    proceso.nombreProceso = proceso.nombreProceso.toUpperCase();
    proceso.descripcion = proceso.descripcion.toUpperCase();
    return this._coreService.put('procesos/' + proceso.id, proceso);
  }
}
