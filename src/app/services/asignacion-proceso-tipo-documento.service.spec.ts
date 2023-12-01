import { TestBed } from '@angular/core/testing';

import { AsignacionProcesoTipoDocumentoService } from './asignacion-proceso-tipo-documento.service';

describe('AsignacionProcesoTipoDocumentoService', () => {
  let service: AsignacionProcesoTipoDocumentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionProcesoTipoDocumentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
