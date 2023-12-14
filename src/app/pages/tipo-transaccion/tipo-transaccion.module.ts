import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoTransaccionRoutingModule } from './tipo-transaccion-routing.module';
import { AddTipoTransaccionComponent } from './components/add-tipo-transaccion/add-tipo-transaccion.component';
import { ListTipoTransaccionComponent } from './components/list-tipo-transaccion/list-tipo-transaccion.component';
import { TipoTransaccionComponent } from './page/tipo-transaccion/tipo-transaccion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TipoTransaccionInfoComponent } from './components/tipo-transaccion-info/tipo-transaccion-info.component';


@NgModule({
  declarations: [
    AddTipoTransaccionComponent,
    ListTipoTransaccionComponent,
    TipoTransaccionComponent,
    TipoTransaccionInfoComponent
  ],
  imports: [
    CommonModule,
    TipoTransaccionRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class TipoTransaccionModule { }
