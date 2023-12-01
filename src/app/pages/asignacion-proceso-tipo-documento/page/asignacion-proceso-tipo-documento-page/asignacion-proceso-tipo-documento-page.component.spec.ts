import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionProcesoTipoDocumentoPageComponent } from './asignacion-proceso-tipo-documento-page.component';

describe('AsignacionProcesoTipoDocumentoPageComponent', () => {
  let component: AsignacionProcesoTipoDocumentoPageComponent;
  let fixture: ComponentFixture<AsignacionProcesoTipoDocumentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionProcesoTipoDocumentoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionProcesoTipoDocumentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
