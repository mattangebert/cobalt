import { Component, OnInit, Input } from '@angular/core';
import { toFormGroup } from './service/option-control-functions';
import { OptionBase } from './model/option-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-option',
  templateUrl: './form-option.component.html',
  styleUrls: ['./form-option.component.scss'],
})
export class FormOptionComponent implements OnInit {

  @Input() options: OptionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor() { }

  ngOnInit(): void {
    this.form = toFormGroup(this.options);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.value);
  }

  getForm(): FormGroup {
    return this.form;
  }

}
