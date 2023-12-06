import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MedioPagoModel } from '@models/medio-pago.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-medio-pago',
  templateUrl: './add-medio-pago.component.html',
  styleUrls: ['./add-medio-pago.component.scss']
})
export class AddMedioPagoComponent implements OnInit {

  @Input() medioPago: MedioPagoModel;//actualizar

  @Output() store: EventEmitter<MedioPagoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formMedioPago: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.medioPago = {
      id: null,
      detalleMedioPago: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setMedioPago()
  }

  get detalleMedioPagoField() {
    return this.formMedioPago.get('detalleMedioPago');
  }

  isNameValid(): boolean {
    const nameControl = this.detalleMedioPagoField;
    return nameControl.valid && !/\d/.test(nameControl.value);
  }

  isNameInvalid(): boolean {
    const nameControl = this.detalleMedioPagoField;
    return nameControl.invalid && (nameControl.dirty || nameControl.touched);
  }

  hasNumericValue(value: string): boolean {
    const numericRegex = /\d/;
    return numericRegex.test(value);
  }

  onNameInputChange(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.formMedioPago.get('detalleMedioPago').setValue(inputValue);
  }

  setMedioPago() {
    if (this.medioPago) {
      this.formMedioPago.patchValue({
        detalleMedioPago: this.medioPago.detalleMedioPago
      })
    }
  }

  private buildForm() {
    this.formMedioPago = this.formBuilder.group({
      id: [0],
      detalleMedioPago: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]+$/)]],
    });
    this.formMedioPago.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarMedioPago() {
    this.store.emit(this.getMedioPago());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formMedioPago.controls[name];
  }

  getMedioPago(): MedioPagoModel {
    return {
      id: this.medioPago?.id,
      detalleMedioPago: this.getControl('detalleMedioPago').value,
    }
  }

}
