import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './page/usuario/usuario.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { MyDatePickerModule } from 'mydatepicker';
import { AsignarRolComponent } from './components/asignar-rol/asignar-rol.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    ListUsuarioComponent,
    AddUsuarioComponent,
    AsignarRolComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class UsuarioModule { }
