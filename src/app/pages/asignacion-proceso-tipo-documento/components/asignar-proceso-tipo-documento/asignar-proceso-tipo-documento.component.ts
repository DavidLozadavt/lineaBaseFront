import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsignacionProcesoTipoDocumentoModel } from '@models/asignacion-proceso-tipo-documento';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { TipoDocumentoService } from '@services/tipo-documento.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-asignar-proceso-tipo-documento',
  templateUrl: './asignar-proceso-tipo-documento.component.html',
  styleUrls: ['./asignar-proceso-tipo-documento.component.scss']
})
export class AsignarProcesoTipoDocumentoComponent implements OnInit {


  @Output() store: EventEmitter<AsignacionProcesoTipoDocumentoModel[]> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  idProceso: number;
  tipoDocs: TipoDocumentoModel[];
  tipoDoc_selected: AsignacionProcesoTipoDocumentoModel[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoDocumentos: TipoDocumentoService,
  ) {
    this.idProceso = 1;
    this.tipoDocs = [];
    this.tipoDoc_selected = [];
  }

  ngOnInit(): void {
    this.tipoDocs = [];
    this.tipoDoc_selected = [];
    this.idProceso = parseInt(localStorage.getItem('idProceso') ?? '1');
    this.getTipoDocumentos();
  }


  getTipoDocumentos() {
    console.log(this.idProceso);
    this._tipoDocumentos.traerTipoDocumentos({ idProceso: this.idProceso })
      .subscribe(
        (tipo_documentos) => {
          console.log(tipo_documentos);
          this.tipoDocs = tipo_documentos as TipoDocumentoModel[];
        },
        (error: HttpErrorResponse) => {
          this._uiNotificationService.error(error.error.message);
        });
  }

  closeModal() {
    this.cancel.emit();
  }

  selectTipoDocumento(event:boolean,idTipoDoc:number){
    if(event){
      this.tipoDoc_selected.push({
        idProceso:this.idProceso,
        idTipoDocumento:idTipoDoc
      });
    }else{
      let index:number = this.tipoDoc_selected.findIndex((tipoDoc)=>tipoDoc.idTipoDocumento == idTipoDoc);
      this.tipoDoc_selected.splice(index,1);
    }
    console.log(this.tipoDoc_selected);
    
  }

  getProcesoTipoDocumentos(): void  {
    this.store.emit(this.tipoDoc_selected);
  }
}
