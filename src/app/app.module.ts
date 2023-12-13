import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ChartsModule } from 'ng2-charts';
import  localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es')

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';

// Import containers
import { DefaultLayoutComponent } from './templates';
import { RouterModule } from '@angular/router';
import { TokenService } from '@services/TokenService';
import { JornadaComponent } from './pages/jornada/page/jornada/jornada.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    SnotifyModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    RouterModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    JornadaComponent
  ],
  providers: [
    TokenService,
    {
      provide: { LOCALE_ID, LocationStrategy },
      useValue: 'es',
      useClass: HashLocationStrategy,
    },
    IconSetService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
