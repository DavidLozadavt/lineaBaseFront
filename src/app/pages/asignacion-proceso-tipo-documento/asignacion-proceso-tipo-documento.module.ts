import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionProcesoTipoDocumentoRoutingModule } from './asignacion-proceso-tipo-documento-routing.module';
import { AsignacionProcesoTipoDocumentoPageComponent } from './page/asignacion-proceso-tipo-documento-page/asignacion-proceso-tipo-documento-page.component';


@NgModule({
  declarations: [
    AsignacionProcesoTipoDocumentoPageComponent
  ],
  imports: [
    CommonModule,
    AsignacionProcesoTipoDocumentoRoutingModule
  ]
})
export class AsignacionProcesoTipoDocumentoModule { }
