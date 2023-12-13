import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  @Input() body: string = "";

  @Output() close:EventEmitter<void> = new EventEmitter();

  closeInfo(): void {
    this.close.emit();
  }
}
