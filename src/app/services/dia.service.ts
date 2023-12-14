import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { DiaModel } from '@models/dia.model';

@Injectable({
  providedIn: 'root'
})

export class DiaService {

  constructor(
    private _coreService: CoreService
  ) { }

  getDays(){
    return this._coreService.get<DiaModel[]>('jornadas/dias');
  }
  
}
