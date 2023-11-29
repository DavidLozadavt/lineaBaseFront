import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionProcesoTipoDocumentoPageComponent } from './page/asignacion-proceso-tipo-documento-page/asignacion-proceso-tipo-documento-page.component';

const routes: Routes = [
  {
    path:'',
    component:AsignacionProcesoTipoDocumentoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionProcesoTipoDocumentoRoutingModule { }
