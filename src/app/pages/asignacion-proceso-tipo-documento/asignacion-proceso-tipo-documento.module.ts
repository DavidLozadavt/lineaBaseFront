import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionProcesoTipoDocumentoRoutingModule } from './asignacion-proceso-tipo-documento-routing.module';
import { AsignacionProcesoTipoDocumentoPageComponent } from './page/asignacion-proceso-tipo-documento-page/asignacion-proceso-tipo-documento-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AsignarProcesoTipoDocumentoComponent } from './components/asignar-proceso-tipo-documento/asignar-proceso-tipo-documento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';


@NgModule({
  declarations: [
    AsignacionProcesoTipoDocumentoPageComponent,
    AsignarProcesoTipoDocumentoComponent
  ],
  imports: [
    CommonModule,
    AsignacionProcesoTipoDocumentoRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ComunModule
  ]
})
export class AsignacionProcesoTipoDocumentoModule { }
