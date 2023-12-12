import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-tipo-transaccion',
  templateUrl: './add-tipo-transaccion.component.html',
  styleUrls: ['./add-tipo-transaccion.component.scss']
})
export class AddTipoTransaccionComponent implements OnInit {

  @Input() tipoT: TipoTransaccionModel;

  @Output() store: EventEmitter<TipoTransaccionModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formTipoT: UntypedFormGroup;

  formTitle: string;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.tipoT = {
      id: null,
      detalle: '',
      descripcion: '',
    };
    this.formTitle = "";
    this.buildForm();
  }

  ngOnInit(): void {
    this.setTipoT();
    this.formTitle = !this.tipoT || !this.tipoT.id
    ? 'Agregar tipo transacción'
    : 'Actualizar tipo transacción';
  }

  get detalleField() {
    return this.formTipoT.get('detalle');
  }

  get descripcionField() {
    return this.formTipoT.get('descripcion');
  }

  isDetalleValid(): boolean {
    const nameControl = this.detalleField;
    return nameControl.valid && !/\d/.test(nameControl.value);
  }

  isDetalleInvalid(): boolean {
    const nameControl = this.detalleField;
    return nameControl.invalid && (nameControl.dirty || nameControl.touched);
  }

  isDescriptionValid(): boolean {
    const nameControl = this.descripcionField;
    return nameControl.valid && !/\d/.test(nameControl.value);
  }

  isDescriptionInvalid(): boolean {
    const nameControl = this.descripcionField;
    return nameControl.invalid && (nameControl.dirty || nameControl.touched);
  }

  hasNumericValue(value: string): boolean {
    const numericRegex = /\d/;
    return numericRegex.test(value);
  }

  onDetalleInputChange(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.formTipoT.get('detalle').setValue(inputValue);
  }

  onDescriptionInputChange(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.formTipoT.get('descripcion').setValue(inputValue);
  }

  setTipoT() {
    if (this.tipoT) {
      this.formTipoT.patchValue({
        detalle: this.tipoT.detalle,
        descripcion: this.tipoT.descripcion
      })
    }
  }

  private buildForm() {
    this.formTipoT = this.formBuilder.group({
      id: [0],
      detalle: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]+$/)]],
      descripcion: ['', [Validators.minLength(10), Validators.maxLength(255), Validators.pattern(/^[A-Za-z\s]+$/)]],
    });

    this.formTipoT.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoTransaccion() {
    this.store.emit(this.getTipoT());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formTipoT.controls[name];
  }

  getTipoT(): TipoTransaccionModel {
    return {
      id: this.tipoT?.id,
      descripcion: this.getControl('descripcion').value,
      detalle: this.getControl('detalle').value
    }
  }

}
