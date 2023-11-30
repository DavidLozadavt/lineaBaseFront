import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProcesoTipoDocumentoComponent } from './asignar-proceso-tipo-documento.component';

describe('AsignarProcesoTipoDocumentoComponent', () => {
  let component: AsignarProcesoTipoDocumentoComponent;
  let fixture: ComponentFixture<AsignarProcesoTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProcesoTipoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProcesoTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
