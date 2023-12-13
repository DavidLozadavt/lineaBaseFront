import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJornadaComponent } from './add-jornada.component';

describe('AddJornadaComponent', () => {
  let component: AddJornadaComponent;
  let fixture: ComponentFixture<AddJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
