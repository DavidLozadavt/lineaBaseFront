import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ActividadMateriaModel } from '@models/actividad-materia.model';
// import { ActividadModel } from '@models/actividad.model';
// import { EvidenciaActividadModel } from '@models/evidencia-actividad.model';
import { FormCustomMessagesModel } from '@models/form-custom-messages.model';
import { NotificacionModel } from '@models/notificacion.model';
// import { ActividadService } from '@services/actividad.service';
import { CoreService } from '@services/core.service';
// import { EvidenciaActividadService } from '@services/evidencia-actividad.service';
import { NotificacionService } from '@services/notificacion.service';
// import { TipoActividadService } from '@services/tipo-actividad.service';
import { EventEmitter } from 'events';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  // **************Evidencia********************* //
  formEvidencia: UntypedFormGroup;
  erroresRespuesta: FormCustomMessagesModel;
  erroresArchivo: FormCustomMessagesModel;
  private files: FileList;
  @Output() cancel = new EventEmitter();
  // ***************************************** //
  notificacion: any[] = [];
  // modalRef: BsModalRef;
  alerts: any[] = [];
  persona: any;
  actividad: any;
  mensaje: any;
  showModalNotificacion = false;
  // actividadNoti: ActividadModel;
  notifi: {};
  constructor(
    private formBuilder: UntypedFormBuilder,
    private notificacionService: NotificacionService,
    private _coreService: CoreService,
    private _router: Router
  ) { }

  traerNotificaciones() {
    this.notificacion = [];
    this.notificacionService.traerNotificaciones()
      .subscribe(notificacion => {

        this.notificacion = notificacion;
        notificacion.forEach((value) => {
          if (value.metadataInfo != null) {
            this.actividad = JSON.parse(value.metadataInfo);
          }
        }
        );
      },
        error => {
          this.alerts.push({
            type: 'danger',
            msg: 'Error de conexión',
            timeout: 5000,
            msgStr: 'Ups!'
          });
        });
  }

  openModal(template: TemplateRef<any>, notificacion: NotificacionModel) {
    this.mensaje = notificacion;
    this.showModalNotificacion = true;

    if (notificacion.estado.estado === 'ACTIVO') {
      this.actualizarEstado(notificacion);

    }

  }

  ngOnInit(): void {

    this.initForm();
    this.traerNotificaciones();
    this._coreService.persona.subscribe(persona => {
      this.persona = persona;
    });
  }

  private initForm() {
    this.formEvidencia = this.formBuilder.group({
      respuestaText: [null, [Validators.required]],
      archivo: [null, [Validators.required]],

    });
  }


  onChangeFile(files: FileList) {
    this.files = files;
  }

  get nameDocumentoActividad() {
    if (this.files && this.files[0]) {
      return this.files[0].name;
    }

    return "seleccione un archivo";
  }

  cancelar() {
    this.formEvidencia.reset();
  }

  actualizarEstado(notificacion: NotificacionModel) {

    this.notificacionService.actualizarEstado(notificacion.id)
      .subscribe(estadoUpdate => {
        this.traerNotificaciones();
      }, (error: any) => {
      });
  }

  // guardar evidencia
  guardar() {
    this.formEvidencia.markAllAsTouched()
    if (this.formEvidencia.invalid) {
      return;
    }
  }
}
