import { Component, OnInit, Input } from '@angular/core';
import { OptionControlService } from './service/option-control.service';
import { OptionBase } from './model/option-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-option',
  templateUrl: './form-option.component.html',
  styleUrls: ['./form-option.component.scss'],
  providers: [ OptionControlService ]
})
export class FormOptionComponent implements OnInit {

  @Input() options: OptionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private ocs: OptionControlService) { }

  ngOnInit() {
    this.form = this.ocs.toFormGroup(this.options);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
