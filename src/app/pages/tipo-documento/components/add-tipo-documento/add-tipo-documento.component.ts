import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProcesoModel } from '@models/proceso.model';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { ProcesoService } from '@services/proceso.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-tipo-documento',
  templateUrl: './add-tipo-documento.component.html',
  styleUrls: ['./add-tipo-documento.component.scss']
})
export class AddTipoDocumentoComponent implements OnInit {

  @Input() tipoDocumento: TipoDocumentoModel;//actualizar

  @Output() store: EventEmitter<TipoDocumentoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formTipoDoc: UntypedFormGroup;
  procesos: ProcesoModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private procesoService: ProcesoService,
    private _uiNotificationService: UINotificationService
  ) {
    this.tipoDocumento = {
      id: null,
      tituloDocumento: '',
      descripcion: '',
      idCompany:1
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerProcesos();
    console.log(this.tipoDocumento ? true: false);
    
    this.setTipoDoc()
  }

  traerProcesos() {
    this.procesoService.traerProcesos()
      .subscribe((proceso: ProcesoModel[]) => {
        this.procesos = proceso;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get tituloDocumentoField() {
    return this.formTipoDoc.get('tituloDocumento');
  }

  get descripcion() {
    return this.formTipoDoc.get('descripcion');
  }

  setTipoDoc() {
    if (this.tipoDocumento) {
      this.formTipoDoc.patchValue({
        tituloDocumento: this.tipoDocumento.tituloDocumento,
        descripcion: this.tipoDocumento.descripcion,
      })
    }
  }

  private buildForm() {
    this.formTipoDoc = this.formBuilder.group({
      id: [0],
      tituloDocumento: ['', [Validators.required]],
      descripcion: [''],
    });

    this.formTipoDoc.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoDoc() {
    this.store.emit(this.getTipoDoc());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formTipoDoc.controls[name];
  }

  getTipoDoc(): TipoDocumentoModel {
    return {
      id: this.tipoDocumento?.id,
      tituloDocumento: this.getControl('tituloDocumento').value,
      descripcion: this.getControl('descripcion').value,
      idCompany: 1
    }
  }
}
