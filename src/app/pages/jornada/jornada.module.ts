import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JornadaRoutingModule } from './jornada-routing.module';
import { AddJornadaComponent } from './components/add-jornada/add-jornada.component';
import { ListJornadaComponent } from './components/list-jornada/list-jornada.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ComunModule } from '@components/comun.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { JornadaComponent } from './page/jornada/jornada.component';


@NgModule({
  exports:[
    AddJornadaComponent
  ],
  declarations: [
    JornadaComponent,
    AddJornadaComponent,
    ListJornadaComponent
  ],
  imports: [
    CommonModule,
    JornadaRoutingModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class JornadaModule { }
