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

  idProceso: number;
  tituloProceso: string;
  tipoDocsId: number[];
  tipoDocumentos: AsignacionProcesoTipoDocumentoModel[];
  tipoDocumento: AsignacionProcesoTipoDocumentoModel;

  showModalTipoDocumento: boolean = false;
  showModalInfo = false;

  numReg = 5;
  pageActual = 0;

  constructor(
    private _uiNotificationService: UINotificationService,
    private _asignacionProcesoTDocumento: AsignacionProcesoTipoDocumentoService,
    private router: Router
  ) {
    this.idProceso = 1;
    this.tituloProceso = "";
    this.tipoDocumentos = [];
    this.tipoDocsId = [];
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
  }
  ngOnInit(): void {
    this.tituloProceso = localStorage.getItem('nombreProceso') ?? 'Proceso';
    this.idProceso = localStorage.getItem('idProceso') ? parseInt(localStorage.getItem('idProceso')) : 1;
    this.getTipoDocumentos();
  }

  enviarNumeroRegistros(event: any) {
    this.numReg = event.target.value;
  }

  getTipoDocumentos() {
    this._asignacionProcesoTDocumento.traerTipoDocumentos({ relations: ['tipoDocumento'], idProceso: this.idProceso }).subscribe(
      (tipoDocumentos: AsignacionProcesoTipoDocumentoModel[]) => {
        this.tipoDocumentos = tipoDocumentos;
      },
      (error: HttpErrorResponse) => {
        this._uiNotificationService.error(error.error.message);

      })
  }

  backToProcesos() {
    this.router.navigate(['/add_proceso']);
  }

  getInfo(tipoDoc:AsignacionProcesoTipoDocumentoModel){
    this.tipoDocumento = tipoDoc;
    this.showModalInfo = true;
  }

  asignarTipoDocumento() {
    this.tipoDocsId = this.tipoDocumentos.map((tipoDoc) => tipoDoc.idTipoDocumento);   
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
    this.showModalTipoDocumento = true;
  }

  guardarAsignacion(tipoDocumentos: AsignacionProcesoTipoDocumentoModel[]) {
    this._asignacionProcesoTDocumento.asignarProcesoTipoDocumento({ asignaciones: tipoDocumentos, relations: ['tipoDocumento'] }).subscribe(tipoDocs => {
      this._uiNotificationService.success('Editada correctamente','Configuración');

      this.reset();
    },
      (error) => {
        this._uiNotificationService.error(error.error.message,'Ocurrio un error');
      })

  }

  reset() {    
    this.getTipoDocumentos();
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
    this.showModalTipoDocumento = false;
    this.showModalInfo = false;
  }
}
