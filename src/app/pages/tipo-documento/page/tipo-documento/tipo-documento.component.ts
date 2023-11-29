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
    this._tipoDocumentoService.eliminarTipoDocumento(tipoDocId).subscribe(() => {
      this.getTipoDocumento();
    },
      (error: HttpErrorResponse) => {
        this._uiNotificationService.error(`${error.error.message}`);
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
      this._tipoDocumentoService.actualizarTipoDocumento(tipoDoc).subscribe(rol => {
        this.getTipoDocumento();
        this.reset();
      });
    } else {
      this._tipoDocumentoService.crearTipoDocumento(tipoDoc).subscribe(rol => {
        this.getTipoDocumento();
        this.reset();
      })
    }
  }

  reset() {
    this.tipoDocumento = null;
    this.showModalTipoDoc = false;
  }

}
