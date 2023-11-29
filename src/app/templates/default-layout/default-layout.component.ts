import { Component, OnInit } from '@angular/core';
import { CompanyModel } from '@models/company.model';
import { PersonaModel } from '../../models/persona.model';
import { navItems } from '../../nav/_nav';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  public persona: PersonaModel = null;
  public company: CompanyModel = null;

  constructor(private _coreService: CoreService) { }

  ngOnInit(): void {
    this._coreService.getUserAuthenticated();

    this._coreService.persona.subscribe(persona => {
      console.log('shit', persona)
      this.persona = persona
    })

    this._coreService.empresa.subscribe(company => {
      if (company) {
        this.company = company
      }
    })

    this._coreService.permissions.subscribe(permission => {
      console.log(permission)
      this.navItems = navItems.filter(permissionNav => {
        return permission.indexOf(permissionNav.permiso) !== -1;
      })
    })
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    window.location.href = "/login"
  }

  get hasLogo() {
    return this.company && this.company.rutaLogoUrl;
  }

  get logoFull() {
    return { src: this.company.rutaLogoUrl, class: 'logo--company' }
  }

  get logoMinimized() {
    return { src: this.company.rutaLogoUrl, width: 30, height: 30, alt: 'Logo' };
  }

  get fullName() {
    if (!this.persona) {
      return '';
    }
    let name = '';
    if (this.persona.nombre1) {
      name += this.persona.nombre1
    }
    if (this.persona.nombre2) {
      name += this.persona.nombre2
    }
    if (this.persona.apellido1) {
      name += this.persona.apellido1
    }
    if (this.persona.apellido2) {
      name += this.persona.apellido2
    }
    return name;
  }

  get avatar() {
    return this.persona ? this.persona.rutaFotoUrl : ''
  }
}
