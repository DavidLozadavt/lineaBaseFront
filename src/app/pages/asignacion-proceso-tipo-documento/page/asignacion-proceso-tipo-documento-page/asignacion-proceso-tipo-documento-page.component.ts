import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionProcesoTipoDocumentoModel } from '@models/asignacion-proceso-tipo-documento';
import { AsignacionProcesoTipoDocumentoService } from '@services/asignacion-proceso-tipo-documento.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-asignacion-proceso-tipo-documento-page',
  templateUrl: './asignacion-proceso-tipo-documento-page.component.html',
  styleUrls: ['./asignacion-proceso-tipo-documento-page.component.scss']
})
export class AsignacionProcesoTipoDocumentoPageComponent implements OnInit {

  idProceso:number;
  tipoDocumentos:AsignacionProcesoTipoDocumentoModel[];
  tipoDocumento:AsignacionProcesoTipoDocumentoModel;

  showModalTipoDocumento:boolean = false;

  numReg = 5;
  pageActual = 0;

  constructor(
    private _uiNotificationService: UINotificationService,
    private _asignacionProcesoTDocumento:AsignacionProcesoTipoDocumentoService,
    private router:Router
  ){
    this.idProceso = 1;
    this.tipoDocumentos = [];
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
  }
  ngOnInit(): void {
    this.idProceso = localStorage.getItem('idProceso') ? parseInt(localStorage.getItem('idProceso')) : 1;
    this.getTipoDocumentos();
  }

  enviarNumeroRegistros(event:any) {
    this.numReg = event.target.value;
  }

  getTipoDocumentos(){
    this._asignacionProcesoTDocumento.traerTipoDocumentos({relations:['tipoDocumento'],idProceso:this.idProceso}).subscribe(
      (tipoDocumentos:AsignacionProcesoTipoDocumentoModel[])=>{
        this.tipoDocumentos = tipoDocumentos;
      },
      (error:HttpErrorResponse)=>{
        this._uiNotificationService.error(error.error.message);

      })
  }

  backToProcesos(){
    this.router.navigate(['/add_proceso']);
  }

  asignarTipoDocumento() {
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
    this.showModalTipoDocumento = true;
  }

  guardarAsignacion(tipoDocumento:AsignacionProcesoTipoDocumentoModel) {
    console.log(tipoDocumento);
    // if (tipoDocumento.id) {
    //   this._asignacionProcesoTDocumento.actualizarProceso(proceso).subscribe(rol => {
    //     this.getProcesos();
    //     this.reset();
    //   });
    // } else {
    //   this._procesoService.crearProceso(proceso).subscribe(rol => {
    //     this.getProcesos();
    //     this.reset();
    //   })
    // }
  }

  reset() {
    this.tipoDocumento = null;
    this.showModalTipoDocumento = false;
  }
}
