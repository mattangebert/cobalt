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

  @Input() public options: OptionBase<any>[] = [];
  public form: FormGroup;
  public payLoad = '';

  constructor() { }

  public ngOnInit(): void {
    this.form = toFormGroup(this.options);
  }

  public onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
