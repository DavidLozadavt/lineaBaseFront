import { Component, OnInit } from '@angular/core';
import { AsignacionDiaJornada } from '@models/asignacion-dia-jornada.model';
import { JornadaModel } from '@models/jornada.model';
import { JornadaService } from '@services/jornada.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.scss']
})
export class JornadaComponent implements OnInit {

  protected showModalJornada: boolean = false;

  jornada: JornadaModel = null;
  jornadas: JornadaModel[] = [];
  dias: AsignacionDiaJornada[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _jornadaService: JornadaService,
  ) { }

  ngOnInit(): void {
    this.getJornadas();
  }


  updateJornada(jornada: JornadaModel) {
    this.jornada = jornada;
    this.showModalJornada = true;
  }

  createJornadaInput() {
    this.jornada = null;
    this.showModalJornada = true;
  }

  getJornadas() {
    this._jornadaService.getJornadas().subscribe(
      (jornadas) => {
        this.jornadas = jornadas;
      }, (error: any) => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  createJornada(jornada: JornadaModel) {
    if (jornada.id) {
      this._jornadaService.updateJornada(jornada).subscribe((jornada) => {
        this.getJornadas();
        this.reset();
        this._uiNotificationService.success('Jornada actualizada exitosamente', 'Jornada')
      }, (jornada: any) => {
        console.log(jornada)
        this._uiNotificationService.error('Ha ocurrido un error inesperado', 'Error');
      });
    } else {
      this._jornadaService.createJornada(jornada).subscribe((jornada) => {
        this.getJornadas();
        this.reset();
        this._uiNotificationService.success('Jornada creada exitosamente', 'Jornada')
      }, (jornada: any) => {
        console.log(jornada)
        this._uiNotificationService.error('Ha ocurrido un error inesperado', 'Error');
      })
    }
  }

  deleteJornada(idJornada: number) {
    this._jornadaService.deleteJornada(idJornada).subscribe(() => {
      this.getJornadas();
      this._uiNotificationService.success('Jornada eliminada correctamente', 'Jornada');
    }, (error) => {
      this._uiNotificationService.error('No puedes eliminar esta jornada porque ya esta siendo usada.', 'Error al eliminar jornada')
    })
  }

  reset() {
    this.jornada = null;
    this.dias = [];
    this.showModalJornada = false;
  }

}
