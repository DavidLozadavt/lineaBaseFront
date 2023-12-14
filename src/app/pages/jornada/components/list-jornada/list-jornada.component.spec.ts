import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJornadaComponent } from './list-jornada.component';

describe('ListJornadaComponent', () => {
  let component: ListJornadaComponent;
  let fixture: ComponentFixture<ListJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
