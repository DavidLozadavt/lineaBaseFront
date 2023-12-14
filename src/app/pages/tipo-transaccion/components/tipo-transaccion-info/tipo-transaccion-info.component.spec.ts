import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTransaccionInfoComponent } from './tipo-transaccion-info.component';

describe('TipoTransaccionInfoComponent', () => {
  let component: TipoTransaccionInfoComponent;
  let fixture: ComponentFixture<TipoTransaccionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTransaccionInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTransaccionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
