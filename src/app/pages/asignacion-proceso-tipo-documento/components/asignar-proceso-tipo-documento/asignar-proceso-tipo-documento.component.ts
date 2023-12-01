import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AsignacionProcesoTipoDocumentoModel } from '@models/asignacion-proceso-tipo-documento';
// import { ProcesoService } from '@services/proceso.service';
import { TipoDocumentoService } from '@services/tipo-documento.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-proceso-tipo-documento',
  templateUrl: './asignar-proceso-tipo-documento.component.html',
  styleUrls: ['./asignar-proceso-tipo-documento.component.scss']
})
export class AsignarProcesoTipoDocumentoComponent implements OnInit {

  @Input() procesoTipoDocumento: AsignacionProcesoTipoDocumentoModel;//actualizar


  @Output() store: EventEmitter<AsignacionProcesoTipoDocumentoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formTipoDocumento: UntypedFormGroup;
  // proceso_select:any[];
  tipoDoc_select: any[];

  constructor(
    // private _procesoService:ProcesoService,
    private _uiNotificationService: UINotificationService,
    private _tipoDocumentos: TipoDocumentoService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.procesoTipoDocumento = {
      idProceso: parseInt(localStorage.getItem('idProceso')) ?? 1,
      idTipoDocumento: 0
    }
    // this.proceso_select = [];
    this.tipoDoc_select = [];
    this.buildForm();
  }

  ngOnInit(): void {
    // if(!localStorage.getItem('proceso_select')){

    // }
    // this.proceso_select = JSON.parse(localStorage.getItem('proceso_select'));
    if (!localStorage.getItem('tipoDoc_select')) {
      this.getTipoDocumentos();
    }
    console.log(localStorage.getItem('tipoDoc_select'));
    
    // localStorage.removeItem('tipoDoc_select');
    const tipoDocString = localStorage.getItem('tipoDoc_select');

  // Verifica que la cadena sea válida antes de intentar analizarla
  if (tipoDocString) {
    try {
      this.tipoDoc_select = JSON.parse(tipoDocString);
    } catch (error) {
      console.error('Error al analizar JSON:', error);
      console.log(tipoDocString);
      // Puedes manejar el error de la manera que prefieras
    }
  }
    this.setProcesoTipoDocumento();
  }

  get idTipoDocumentoField() {
    return this.formTipoDocumento.get('idTipoDocumento');
  }


  setProcesoTipoDocumento() {
    if (this.procesoTipoDocumento) {
      this.formTipoDocumento.patchValue({
        idTipoDocumento: this.procesoTipoDocumento.idTipoDocumento
      })
    }
  }

  getTipoDocumentos() {
    this._tipoDocumentos.traerTipoDocumentos({ columns: ['id', 'tituloDocumento'] })
      .subscribe(
        (tipo_documentos) => {
          localStorage.setItem('tipoDoc_select',JSON.stringify(tipo_documentos));
        },
        (error: HttpErrorResponse) => {
          this._uiNotificationService.error(error.error.message);
        })
  }

  private buildForm() {
    this.formTipoDocumento = this.formBuilder.group({
      id: [0],
      idTipoDocumento: [0, [Validators.required]],
    });

    this.formTipoDocumento.valueChanges
      .pipe(
        debounceTime(350),
      ).subscribe(data => {
        console.log(data);
      });
  }

  asignarTipoDocumento(){
    this.store.emit(this.getProcesoTipoDocumento())
  }

  closeModal(){
    this.cancel.emit();
  }

  private getControl(controlName: string) {
    return this.formTipoDocumento.controls[controlName];
  }

  private getProcesoTipoDocumento(): AsignacionProcesoTipoDocumentoModel {
    return {
      id: this.procesoTipoDocumento?.id,
      idProceso: parseInt(localStorage.getItem('idProceso')) ?? 1,
      idTipoDocumento: parseInt(this.getControl('idTipoDocumento').value),
    }
  }
}
