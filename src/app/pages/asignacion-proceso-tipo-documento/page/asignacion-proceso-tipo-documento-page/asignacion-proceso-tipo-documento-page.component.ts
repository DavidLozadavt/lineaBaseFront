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

  totalElementos: number; // Mantén un seguimiento del total de elementos
  numPaginas: number; // Mantén un seguimiento del número total de páginas

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
        this.calcularTotalElementos(); // Calcular el total de elementos después de recibir los datos
        this.calcularNumPaginas(); // Calcular el número total de páginas
        this.validarPaginaActual(); // Validar la página actual
      },
      (error: HttpErrorResponse) => {
        this._uiNotificationService.error(error.error.message);
      });
  }

  calcularTotalElementos() {
    // Calcular el total de elementos
    this.totalElementos = this.tipoDocumentos.length;
  }

  calcularNumPaginas() {
    // Calcular el número total de páginas
    this.numPaginas = Math.ceil(this.totalElementos / this.numReg);
  }


  
  validarPaginaActual() {
    // Verificar si la página actual está más allá del número total de páginas
    if (this.pageActual > this.numPaginas) {
      // Si la página actual está más allá del número total de páginas, establecerla en la última página válida
      this.pageActual = this.numPaginas;
    }
  }

  backToProcesos() {
    this.router.navigate(['/gestion_proceso']);
  }

  getInfo(tipoDoc: AsignacionProcesoTipoDocumentoModel) {
    this.tipoDocumento = tipoDoc;
    this.showModalInfo = true;
  }

  asignarTipoDocumento() {
    this.tipoDocsId = this.tipoDocumentos.map((tipoDoc) => tipoDoc.idTipoDocumento);
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
    this.showModalTipoDocumento = true;
  }

  guardarAsignacion(tipoDocumentos: AsignacionProcesoTipoDocumentoModel[]) {
    this._asignacionProcesoTDocumento
      .asignarProcesoTipoDocumento(
        {
          asignaciones: tipoDocumentos,
          idProceso: this.idProceso,
          relations: ['tipoDocumento']
        }).subscribe(tipoDocs => {
          this._uiNotificationService.success('Editada correctamente', 'Configuración');
          this.reset();
        },
          (error) => {
            this._uiNotificationService.error(error.error.message, 'Ocurrio un error');
          })
  }

  reset() {
    this.getTipoDocumentos();
    this.tipoDocumento = {} as AsignacionProcesoTipoDocumentoModel;
    this.showModalTipoDocumento = false;
    this.showModalInfo = false;
  }
}
