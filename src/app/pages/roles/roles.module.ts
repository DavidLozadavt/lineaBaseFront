import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolComponent } from './page/rol/rol.component';
import { RolesRoutingModule } from './roles-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  exports: [
    RolesComponent
  ],
  declarations: [
    RolesComponent,
    RolesListComponent,
    RolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    Ng2SearchPipeModule,
    FormsModule,
  ]
})
export class RolesModule { }
