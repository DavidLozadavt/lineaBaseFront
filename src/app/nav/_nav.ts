import { Routes } from '@angular/router';
import { NavegacionModel } from '../models/navegacion.model';
import {
  GESTION_MEDIO_PAGO,
  GESTION_PROCESOS,
  GESTION_ROLES,
  GESTION_ROL_PERMISOS,
  GESTION_TIPO_DOCUMENTOS,
  GESTION_TIPO_PAGO,
  GESTION_TIPO_TRANSACCION,
  GESTION_PAGO_NOMINA,
  GESTION_SEDE,
  GESTION_AREA,
  GESTION_INFRAESTRUCTURA,
  GESTION_USUARIO,
  GESTION_JORNADA
} from './permissions';
import { AsignacionProcesoTipoDocumentoModule } from '../pages/asignacion-proceso-tipo-documento/asignacion-proceso-tipo-documento.module';
import { JornadaModule } from '../pages/jornada/jornada.module';

export const navItems: NavegacionModel[] = [
  {
    name: 'Roles',
    url: 'add_roles',
    icon: 'fas fa-user-shield',
    permiso: GESTION_ROLES
  },
  {
    name: "Permisos",
    url: 'add_permission',
    icon: 'fas fa-lock',
    permiso: GESTION_ROL_PERMISOS
  },
  {
    name: "Procesos",
    url: 'add_proceso',
    icon: 'fas fa-cogs',
    permiso: GESTION_PROCESOS
  },
  {
    name: "Medios de Pago",
    url: 'add_medio_pago',
    icon: 'fas fa-credit-card',
    permiso: GESTION_MEDIO_PAGO
  },
  {
    name: "Tipos de Pago",
    url: 'add_tipo_pago',
    icon: 'fas fa-money-bill',
    permiso: GESTION_TIPO_PAGO
  },
  {
    name: "Tipos de Transacción",
    url: 'add_tipo_transaccion',
    icon: 'fas fa-exchange-alt',
    permiso: GESTION_TIPO_TRANSACCION
  },
  {
    name: "Usuarios",
    url: 'add_usuarios',
    icon: 'fa-solid fa-user',
    permiso: GESTION_USUARIO
  },
  {
    name: "Pagos Nomina Supervisor",
    url: 'gestionar_nomina_supervisor',
    icon: 'icon_drop',
    permiso: GESTION_PAGO_NOMINA,
  },
  {
    name: "Sedes",
    url: 'gestionar_sede', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_SEDE,
  },
  {
    name: "Area",
    url: 'gestionar_area', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_AREA,
  },
  {
    name: "Infraestructura",
    url: 'gestionar_infraestructura', //URL que mostrará la vista
    icon: 'icon-home',
    permiso: GESTION_INFRAESTRUCTURA,
  },
  {
    name: "Jornada",
    url: 'gestion_jornada',
    icon: 'fas fa-clock',
    permiso: GESTION_JORNADA
  }

];


export const routesNav: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('../pages/notificacion/notificacion.module').then(m => m.NotificacionModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'add_roles',
    loadChildren: () => import('../pages/roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'add_permission',
    loadChildren: () => import('../pages/permiso/permiso.module').then(m => m.PermisoModule)
  },
  {
    path: 'add_proceso',
    loadChildren: () => import('../pages/proceso/proceso.module').then(m => m.ProcesoModule)
  },
  {
    path: 'add_tipo_documento',
    loadChildren: () => import('../pages/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule)
  },
  {
    path: 'add_medio_pago',
    loadChildren: () => import('../pages/medio-pago/medio-pago.module').then(m => m.MedioPagoModule)
  },
  {
    path: 'add_tipo_pago',
    loadChildren: () => import('../pages/tipo-pago/tipo-pago.module').then(m => m.TipoPagoModule)
  },
  {
    path: 'add_tipo_transaccion',
    loadChildren: () => import('../pages/tipo-transaccion/tipo-transaccion.module').then(m => m.TipoTransaccionModule)
  },
  {
    path: 'add_usuarios',
    loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'gestionar_nomina_supervisor',
    loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'gestionar_sede',
    loadChildren: () => import('../pages/sede/sede.module').then(m => m.SedeModule)
  },
  {
    path: 'gestionar_area',
    loadChildren: () => import('../pages/area/area.module').then(m => m.AreaModule)
  },
  {
    path: 'gestionar_infraestructura',
    loadChildren: () => import('../pages/infraestructura/infraestructura.module').then(m => m.InfraestructuraModule)
  },
  {
    path: 'asignacion_proceso_tipo_documento',
    loadChildren: () => import('../pages/asignacion-proceso-tipo-documento/asignacion-proceso-tipo-documento.module').then(m => AsignacionProcesoTipoDocumentoModule)
  },
  {
    path: 'gestion_jornada',
    loadChildren: () => import('../pages/jornada/jornada.module').then(m => JornadaModule)
  }
];
