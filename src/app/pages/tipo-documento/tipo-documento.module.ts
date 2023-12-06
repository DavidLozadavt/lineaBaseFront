import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoComponent } from './page/tipo-documento/tipo-documento.component';
import { AddTipoDocumentoComponent } from './components/add-tipo-documento/add-tipo-documento.component';
import { ListTipoDocumentoComponent } from './components/list-tipo-documento/list-tipo-documento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  exports:[
    AddTipoDocumentoComponent
  ],
  declarations: [
    TipoDocumentoComponent,
    AddTipoDocumentoComponent,
    ListTipoDocumentoComponent
  ],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class TipoDocumentoModule { }
