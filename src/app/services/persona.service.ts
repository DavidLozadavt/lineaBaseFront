import { Injectable } from '@angular/core';
import { PersonaModel } from '@models/persona.model';
import { TipoIdentificacionModel } from '@models/tipo-identificacion.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: PersonaModel;

  constructor(
    private _coreService: CoreService
  ) { }


  public traerTiposId() {
    return this._coreService.get<TipoIdentificacionModel[]>('tipo_identificaciones');
  }

  public traerPersonas(data = {}) {
    return this._coreService.get<PersonaModel[]>('personas', data)
  }

  personById(id: number)
  {
    return this._coreService.get<PersonaModel>('users/person/' + id);
  }

  crearPersona(persona: FormData) {
    return this._coreService.post<PersonaModel>('personas', persona);
  }

  /*updateProfile(persona: PersonaModel, fotoAvatar: FileList) {
    let data = new FormData();

    if (persona.email) {
      data.append('email', persona.email);
    }
    if (persona.direccion) {
      data.append('direccion', persona.direccion);
    }
    if (persona.celular) {
      data.append('telefonoFijo', persona.telefonoFijo);
    }
    if (persona.celular) {
      data.append('celular', persona.celular);
    }

    if (persona.ciudadNac && persona.ciudadNac.id) {
      data.append('idciudadNac', persona.ciudadNac.id + "");
    }
    if (persona.ciudad && persona.ciudad.id) {
      data.append('idciudad', persona.ciudad.id + "");
    }
    if (persona.ciudadUbicacion && persona.ciudadUbicacion.id) {
      data.append('idciudadUbicacion', persona.ciudadUbicacion.id + "");
    }

    if (fotoAvatar) {
      data.append('rutaFotoFile', fotoAvatar[0]);
    }

    return this._coreService.put('users/person', data);
  }*/

  updateProfile(persona: PersonaModel, fotoAvatar: FileList) {
    const data = new FormData();
  
    // Agregar propiedades de persona a FormData
    for (const prop of ['email', 'direccion', 'telefonoFijo', 'celular']) {
      data.append(prop, persona[prop] || '');
    }
  
    // Agregar propiedades de ciudad a FormData si existen
    for (const prop of ['ciudadNac', 'ciudad', 'ciudadUbicacion']) {
      if (persona[prop] && persona[prop].id) {
        data.append(`id${prop}`, persona[prop].id + "");
      }
    }
  
    // Agregar foto de avatar a FormData si existe
    if (fotoAvatar && fotoAvatar.length > 0) {
      data.append('rutaFotoFile', fotoAvatar[0]);
    }
  
    return this._coreService.put('users/person', data);
  }  

  eliminarPersona(personaId: number) {
    return this._coreService.post(`personas/${personaId}`, personaId);
  }

  public personaByIdentificacion(identificacion: number) {
    return this._coreService.get<PersonaModel>('personas?identificacion=' + identificacion + '&pagination=1');
  }
  public getAcudiente(idPersona: number) {
    return this._coreService.get('colegio/acudientes?identificacion_estudiante=' + idPersona + '&paginate=1');
  }

  actualizarPersona(persona: FormData) {
    return this._coreService.put('personas/' + persona.get('id'), persona);
  }

}
