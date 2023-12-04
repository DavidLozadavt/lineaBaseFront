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
    this._procesoService.eliminarProceso(procesoId).subscribe(() => {
      this.getProcesos();
    })
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
      this._procesoService.actualizarProceso({proceso:proceso}).subscribe(newProceso => {
        let procesoIndex:number = this.procesos.findIndex(proceso=>proceso.id == newProceso.id);
        this.procesos[procesoIndex] = newProceso;
        this.reset();
      });
    } else {
      this._procesoService.crearProceso({proceso:proceso}).subscribe(newProceso => {
        this.procesos.push(newProceso);
        this.reset();
      })
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
