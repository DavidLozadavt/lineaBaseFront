import { Component, OnInit } from '@angular/core';
import { ProcesoModel } from '@models/proceso.model';
import { ProcesoService } from '@services/proceso.service';
import { UINotificationService } from '@services/uinotification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {

  protected showModalProceso = false;

  proceso: ProcesoModel = null;
  procesos: ProcesoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _procesoService: ProcesoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos() {
    this._procesoService.traerProcesos()
      .subscribe(proceso => {
        this.procesos = proceso;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarProceso(procesoId: number) {
    this._procesoService.eliminarProceso(procesoId).subscribe(
      () => {
        let procesoIndex = this.procesos.findIndex((proceso)=>proceso.id == procesoId);
        let nombreProceso = this.procesos[procesoIndex].nombreProceso;
        this.procesos.splice(procesoIndex,1);
        this._uiNotificationService.success('Eliminado correctamente',nombreProceso);
      },
      (error)=>{
        this._uiNotificationService.error(`${error.error.message}`,'No se pudo eliminar');
      });
  }

  actualizarProceso(proceso: ProcesoModel) {
    this.proceso = proceso;
    this.showModalProceso = true;
  }

  createProceso() {
    this.proceso = null;
    this.showModalProceso = true;
  }

  guardarProceso(proceso: ProcesoModel) {
    if (proceso.id) {
      this._procesoService.actualizarProceso({proceso:proceso}).subscribe(
        (newProceso) => {
        let procesoIndex:number = this.procesos.findIndex(proceso=>proceso.id == newProceso.id);
        this.procesos[procesoIndex] = newProceso;
        this._uiNotificationService.success('Actualizado correctamente',newProceso.nombreProceso);
        this.reset();
      },
      (error)=>{
        this._uiNotificationService.error(error.error.code,'Error al actualizar');
      });
    } else {
      this._procesoService.crearProceso({proceso:proceso}).subscribe(
        (newProceso) => {
        this.procesos.push(newProceso);
        this._uiNotificationService.success('Agregado correctamente',newProceso.nombreProceso);
        this.reset();
      },
      (error)=>{
        this._uiNotificationService.error(error.error.code,'Error al agregar');
      });
    }
  }

  reset() {
    this.proceso = null;
    this.showModalProceso = false;
  }

  vistaDocumentos(proceso:ProcesoModel){
    localStorage.setItem('nombreProceso',proceso.nombreProceso);
    localStorage.setItem('idProceso',proceso.id.toString());
    this.router.navigate(['/asignacion_proceso_tipo_documento']);
  }
}
