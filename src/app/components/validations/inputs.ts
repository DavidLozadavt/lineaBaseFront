import { AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function convertInputToUppercase(fieldName: string, formGroup: FormGroup, event: any): void {
  const inputElement = event.target;
  const inputValue = inputElement.value.toUpperCase();
  formGroup.get(fieldName)?.setValue(inputValue);
}

// Función para verificar si un control es válido y no contiene números
export function isControlValid(control: AbstractControl): boolean {
  return control.valid && !/\d/.test(control.value);
}

// Función para verificar si un control es inválido y ha sido tocado o modificado
export function isControlInvalid(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}

export function containsOnlyNumbers(control: AbstractControl): boolean {
  const value = control.value;
  return !isNaN(Number(value));
}

export function containsOnlyNumbersFromStrings(control: AbstractControl): boolean {
  const value = control.value;
  return /^\d+$/.test(value);
}

export function isStrongPassword(value: string): boolean {
  // Verifica si la contraseña tiene al menos una letra, un número y un carácter especial
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[=¬ ^`~';+\-\/°_¡¿¨´!@#$%^&*(),.?":{}|<>]/.test(value);

  // La contraseña es fuerte si cumple con todos los criterios
  return hasLetter && hasNumber && hasSpecialChar;
}


