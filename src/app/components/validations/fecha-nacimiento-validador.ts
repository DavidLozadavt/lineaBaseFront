import { AbstractControl } from '@angular/forms';

export function fechaNacimientoValida(control: AbstractControl): { [key: string]: boolean } | null {
  const fechaNacimiento = new Date(control.value);
  const fechaActual = new Date();

  if (isNaN(fechaNacimiento.getTime()) || fechaNacimiento > fechaActual) {
    return { 'fechaNacimientoInvalida': true };
  }

  return null;
}
