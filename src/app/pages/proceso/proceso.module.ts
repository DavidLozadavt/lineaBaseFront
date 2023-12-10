import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { AddProcesoComponent } from './components/add-proceso/add-proceso.component';
import { ListProcesoComponent } from './components/list-proceso/list-proceso.component';
import { ProcesoComponent } from './page/proceso/proceso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  exports:[
    AddProcesoComponent
  ],
  declarations: [
    AddProcesoComponent,
    ListProcesoComponent,
    ProcesoComponent
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class ProcesoModule { }
