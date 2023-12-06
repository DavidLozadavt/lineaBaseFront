import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisosComponent } from './components/permisos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PermisosComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    ReactiveFormsModule,
    ComunModule,
    FormsModule,
    AutocompleteLibModule,
    NgxPaginationModule,
  ]
})
export class PermisoModule { }
