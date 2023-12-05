import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoPagoModel } from '@models/tipo-pago.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-tipo-pago',
  templateUrl: './add-tipo-pago.component.html',
  styleUrls: ['./add-tipo-pago.component.scss']
})
export class AddTipoPagoComponent implements OnInit {

  @Input() tipoPago: TipoPagoModel;

  @Output() store: EventEmitter<TipoPagoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formTipoPago: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.tipoPago = {
      id: null,
      detalleTipoPago: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setTipoPago()
  }

  get detalleTipoPagoField() {
    return this.formTipoPago.get('detalleTipoPago');
  }

  
  isNameValid(): boolean {
    const nameControl = this.detalleTipoPagoField;
    return nameControl.valid && !/\d/.test(nameControl.value);
  }

  isNameInvalid(): boolean {
    const nameControl = this.detalleTipoPagoField;
    return nameControl.invalid && (nameControl.dirty || nameControl.touched);
  }

  hasNumericValue(value: string): boolean {
    const numericRegex = /\d/;
    return numericRegex.test(value);
  }

  onNameInputChange(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.formTipoPago.get('detalleTipoPago').setValue(inputValue);
  }

  setTipoPago() {
    if (this.tipoPago) {
      this.formTipoPago.patchValue({
        detalleTipoPago: this.tipoPago.detalleTipoPago
      })
    }
  }

  private buildForm() {
    this.formTipoPago = this.formBuilder.group({
      id: [0],
      detalleTipoPago: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]+$/)]],
    });

    this.formTipoPago.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoPago() {
    this.store.emit(this.getTipoPago());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formTipoPago.controls[name];
  }

  getTipoPago(): TipoPagoModel {
    return {
      id: this.tipoPago?.id,
      detalleTipoPago: this.getControl('detalleTipoPago').value,
    }
  }

}
