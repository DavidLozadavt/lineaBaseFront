import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += `${hours} h`;
    }

    if (minutes > 0) {
      formattedDuration += ` ${minutes} min`;
    }

    return formattedDuration.trim();
  }
}