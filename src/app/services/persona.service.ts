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

  personById(id: number) {
    return this._coreService.get<PersonaModel>('users/person/' + id);
  }

  crearPersona(persona: FormData) {
    return this._coreService.post<PersonaModel>('personas', persona);
  }

  updatePerson(persona: PersonaModel, fotoAvatar?: FileList) {
    const data = new FormData();

    const propiedades = ['identificacion', 'email', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'direccion', 'telefonoFijo', 'celular'];

    propiedades.forEach(propiedad => {
      const valor = persona[propiedad];
      if (valor !== undefined && valor !== null) {
        if (propiedad === 'email') {
          data.append(propiedad, valor.toLowerCase());
        } else {
          data.append(propiedad, valor === "" ? valor : valor.toUpperCase());
        }
      }
    });

    if (fotoAvatar && fotoAvatar[0] instanceof File) {
      data.append('rutaFotoFile', fotoAvatar[0]);
    }

    ['ciudadNac', 'ciudad', 'ciudadUbicacion'].forEach(ciudadPropiedad => {
      const ciudad = persona[ciudadPropiedad];
      if (ciudad && ciudad.id) {
        data.append(`id${ciudadPropiedad}`, ciudad.id + "");
      }
    });

    if (persona.fechaNac) {
      const fechaNac = new Date(persona.fechaNac);
      data.append('fechaNac', fechaNac.toISOString());
    }

    return this._coreService.put('users/person/' + persona.id, data);
  }

  /*updatePerson(persona: PersonaModel, fotoAvatar?: FileList) {
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
  
    return this._coreService.put('users/person/' + persona.id, data);
  }*/

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
