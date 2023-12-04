import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RolModel } from '@models/rol.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  @Input() rol: RolModel;//actualizar

  @Output() store: EventEmitter<RolModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formRol: UntypedFormGroup;

  selectedCompanyId: number;
  empresaFilter: string = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.rol = {
      id: null,
      name: '',
      guard_name: '',
      idCompany: null
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setRol()
  }

  get nombreRolField() {
    return this.formRol.get('name');
  }

  setRol() {
    if (this.rol) {
      this.formRol.patchValue({
        name: this.rol.name,
        idCompany: this.rol.idCompany
      })
    }
  }

  private buildForm() {
    this.formRol = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]+$/)]],
    });

    this.formRol.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarRol() {
    this.store.emit(this.getRol());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formRol.controls[name];
  }

  getRol(): RolModel {
    return {
      id: this.rol?.id,
      name: this.getControl('name').value
    }
  }

}
