import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { TipoDocumentoService } from '@services/tipo-documento.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {

  showModalTipoDoc = false;

  tipoDocumento: TipoDocumentoModel = null;
  tipoDocumentos: TipoDocumentoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoDocumentoService: TipoDocumentoService
  ) { }

  ngOnInit(): void {
    this.getTipoDocumento();
  }

  getTipoDocumento() {
    this._tipoDocumentoService.traerTipoDocumentos()
      .subscribe(
        (tipoDocumentos) => {
          this.tipoDocumentos = tipoDocumentos;
        },
        (error) => {
          this._uiNotificationService.error("Error de conexión");
        });
  }

  eliminarTipoDoc(tipoDocId: number) {
    this._tipoDocumentoService.eliminarTipoDocumento(tipoDocId).subscribe(
      () => {
        let tipoDocIndex = this.tipoDocumentos.findIndex((tipoDoc)=>tipoDoc.id == tipoDocId);
        let tituloDocumento = this.tipoDocumentos[tipoDocIndex].tituloDocumento;
        this.tipoDocumentos.splice(tipoDocIndex,1);
        this._uiNotificationService.success('Eliminado correctamente',tituloDocumento);
      },
      (error: HttpErrorResponse) => {
        this._uiNotificationService.error(`${error.error.message}`, 'No se pudo eliminar');
      });
  }

  actualizarTipoDoc(tipoDoc: TipoDocumentoModel) {
    this.tipoDocumento = tipoDoc;
    this.showModalTipoDoc = true;
  }

  createTipoDoc() {
    this.tipoDocumento = null;
    this.showModalTipoDoc = true;
  }

  guardarTipoDoc(tipoDoc: TipoDocumentoModel) {
    if (tipoDoc.id) {
      this._tipoDocumentoService.actualizarTipoDocumento({ tipoDocumento: tipoDoc }).subscribe(tipoDoc => {
        let tipoDocIndex: number = this.tipoDocumentos.findIndex(tDoc => tDoc.id == tipoDoc.id);
        this.tipoDocumentos[tipoDocIndex] = tipoDoc;
        this.reset();
      });
    } else {
      this._tipoDocumentoService.crearTipoDocumento({ tipoDocumento: tipoDoc }).subscribe(tipoDoc => {
        this.tipoDocumentos.push(tipoDoc)
        this.reset();
      })
    }
  }

  reset() {
    this.tipoDocumento = null;
    this.showModalTipoDoc = false;
  }

}
