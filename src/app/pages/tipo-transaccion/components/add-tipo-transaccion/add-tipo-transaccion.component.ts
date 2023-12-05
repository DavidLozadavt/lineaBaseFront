import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';
import { UINotificationService } from '@services/uinotification.service';
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

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.tipoT = {
      id: null,
      detalle: '',
      descripcion: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setTipoT()
  }

  get detalleField() {
    return this.formTipoT.get('detalle');
  }

  get descripcionField() {
    return this.formTipoT.get('descripcion');
  }

  isNameValid(): boolean {
    const nameControl = this.detalleField;
    const descripcionControl = this.descripcionField;
    return (nameControl.valid && !/\d/.test(nameControl.value)) || (descripcionControl.valid && !/\d/.test(descripcionControl.value));
  }

  isNameInvalid(): boolean {
    const nameControl = this.detalleField;
    const descripcionControl = this.descripcionField;
    return (nameControl.valid && !/\d/.test(nameControl.value)) || (descripcionControl.valid && !/\d/.test(descripcionControl.value));
  }

  isDescriptionInvalid(): boolean {
    const descripcionControl = this.descripcionField;
    return descripcionControl.valid && !/\d/.test(descripcionControl.value);
  }

  hasNumericValue(value: string): boolean {
    const numericRegex = /\d/;
    return numericRegex.test(value);
  }

  onNameInputChange(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.formTipoT.get('detalle').setValue(inputValue);
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
      descripcion: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]+$/)]],
    });

    this.formTipoT.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoT() {
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
