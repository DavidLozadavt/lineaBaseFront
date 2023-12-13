import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input, ChangeDetectorRef } from '@angular/core';
import { AsignacionProcesoTipoDocumentoModel } from '@models/asignacion-proceso-tipo-documento';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { TipoDocumentoService } from '@services/tipo-documento.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-asignar-proceso-tipo-documento',
  templateUrl: './asignar-proceso-tipo-documento.component.html',
  styleUrls: ['./asignar-proceso-tipo-documento.component.scss'],
})
export class AsignarProcesoTipoDocumentoComponent implements OnInit {

  @Input() tipoDocsId: number[];
  showModalTipoDoc = false;
  showModalInfo = false;
  tipoDocsAsigned: boolean[];

  @Output() store: EventEmitter<AsignacionProcesoTipoDocumentoModel[]> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  idProceso: number;
  tipoDocs: TipoDocumentoModel[];
  tipoDoc: TipoDocumentoModel;
  tipoDoc_selected: (AsignacionProcesoTipoDocumentoModel|null)[];

  numReg = 5;
  pageActual = 0;

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoDocumentos: TipoDocumentoService,
  ) {
    this.idProceso = 1;
    this.tipoDocs = [];
    this.tipoDoc = {} as TipoDocumentoModel;
    this.tipoDoc_selected = [];
    this.tipoDocsAsigned = [];
    this.tipoDocsId = [];
  }

  ngOnInit(): void {
    this.idProceso = parseInt(localStorage.getItem('idProceso') ?? '1');
    this.getTipoDocumentos();
  }


  getTipoDocumentos() {
    this._tipoDocumentos.traerTipoDocumentos({ idProceso: this.idProceso })
      .subscribe(
        (tipo_documentos) => {
          this.tipoDocs = tipo_documentos as TipoDocumentoModel[];
          this.tipoDocsId = this.tipoDocs.map((tipoDoc)=>{
            if(this.tipoDocsId.some((id)=>id==tipoDoc.id)){
              this.tipoDocsAsigned.push(true);
              this.tipoDoc_selected.push({idProceso:this.idProceso,idTipoDocumento:tipoDoc.id});
              return tipoDoc.id
            }
            this.tipoDocsAsigned.push(false);
            this.tipoDoc_selected.push(null);
            console.log(this.tipoDoc_selected);
            return 0;
          });
          console.log(this.tipoDocsId);
          
          this.tipoDocs.forEach((tipoDoc) => {
            this.tipoDocsAsigned.push(this.checkedTipoDoc(tipoDoc.id));
          });          
        },
        (error: HttpErrorResponse) => {
          this._uiNotificationService.error(error.error.message);
        });
  }

  closeModal() {
    this.cancel.emit();
  }

  selectTipoDocumento(index:number) {
    let idTipoDoc:number = this.tipoDocs[index].id;
    
    if (this.tipoDocsAsigned[index]) {
      this.tipoDoc_selected[index] = {idProceso:this.idProceso,idTipoDocumento:idTipoDoc};
      this.tipoDocsId[index] = idTipoDoc;
    } else {
      this.tipoDoc_selected[index] = null;
      this.tipoDocsId[index] = 0;
    }
  }

  guardarTipoDoc(tipoDoc: TipoDocumentoModel) {
    if (tipoDoc.id) {
      this._tipoDocumentos.actualizarTipoDocumento({ tipoDocumento: tipoDoc }).subscribe(
        (tipoDoc) => {
        let tipoDocIndex: number = this.tipoDocs.findIndex(tDoc => tDoc.id == tipoDoc.id);
        this.tipoDocs[tipoDocIndex] = tipoDoc;
        this._uiNotificationService.success('Actualizado correctamente',tipoDoc.tituloDocumento);
        this.reset();
      },
      (error)=>{
        this._uiNotificationService.error(error.error.message,'Error al actualizar');
      });
    } else {
      this._tipoDocumentos.crearTipoDocumento({ tipoDocumento: tipoDoc }).subscribe(tipoDoc => {
        this.tipoDocs.push(tipoDoc);
        this.tipoDocsAsigned.push(false);
        this.tipoDoc_selected.push(null);
        this._uiNotificationService.success('Agregado correctamente',tipoDoc.tituloDocumento);
        this.reset();
      },
      (error)=>{
        this._uiNotificationService.error(error.error.message,'Error al agregar');
      });
    }
  }

  getInfo(tipoDoc:TipoDocumentoModel){
    this.tipoDoc = tipoDoc;
    this.showModalInfo = true;
  }

  actualizarTipoDoc(tipoDoc: TipoDocumentoModel) {
    this.tipoDoc = tipoDoc;
    this.showModalTipoDoc = true;
  }

  createTipoDoc() {
    this.tipoDoc = {} as TipoDocumentoModel;
    this.showModalTipoDoc = true;
  }

  reset() {
    this.tipoDoc = {} as TipoDocumentoModel;
    this.showModalTipoDoc = false;
    this.showModalInfo = false;
  }

  eliminarTipoDoc(tipoDocId: number) {
    this._tipoDocumentos.eliminarTipoDocumento(tipoDocId).subscribe(() => {
      let tipoDocIndex: number = this.tipoDocs.findIndex(tDoc => tDoc.id == tipoDocId);
      let tituloDocumento = this.tipoDocs[tipoDocIndex].tituloDocumento;
      this.tipoDocs.splice(tipoDocIndex, 1);
      this.tipoDoc_selected.splice(tipoDocIndex,1);
      this.tipoDocsAsigned.splice(tipoDocIndex,1);
      this._uiNotificationService.success('Eliminado correctamente',tituloDocumento);
    },
      (error: HttpErrorResponse) => {
        this._uiNotificationService.error(`${error.error.message}`);
      });
  }

  checkedTipoDoc(idTipoDoc: number): boolean {
    let checked = this.tipoDocsId.some((tipoDocId) => tipoDocId == idTipoDoc);
    return checked;
  }

  getProcesoTipoDocumentos(): void {
    let asignados:AsignacionProcesoTipoDocumentoModel[] = this.tipoDoc_selected.filter((tipoDoc)=>tipoDoc) as AsignacionProcesoTipoDocumentoModel[];    
    this.store.emit(asignados);
  }

  enviarNumeroRegistros(event: any) {
    this.numReg = event.target.value;
  }
}
