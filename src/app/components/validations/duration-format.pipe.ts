import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {
  
  transform(value: string): string {
    if (!value) {
      return '0';
    }

    const timeParts = value.split(':');
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
  
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0) {
      return '0';
    }

    if (hours > 0 && minutes > 0) {
      return `${hours} h ${minutes} min`;
    } else if (hours > 0) {
      return `${hours} h`;
    } else if (minutes > 0) {
      return `${minutes} min`;
    } else {
      return '0';
    }
  }
}
