import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-switch',
  templateUrl: './custom-switch.component.html',
  styleUrls: ['./custom-switch.component.css']
})
export class CustomSwitchComponent {

  @Input() size: number = 10;

  @Input() msg_true: string = '';
  @Input() msg_false: string = '';

  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  toggle(event) {
    this.checkedChange.emit(event.target.checked);
  }

  get sizePx() {
    return `${this.size}px`
  }

  get customTitle() {
    if (this.msg_true || this.msg_false) {
      return this.checked ? this.msg_true : this.msg_false
    }
    return '';
  }

}
