import { Component, Input,  } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { OptionBase } from '../model/option-base';

@Component({
  selector: 'app-form-option-element',
  templateUrl: './form-option-element.component.html',
  styleUrls: ['./form-option-element.component.scss']
})
export class FormOptionElementComponent {
  @Input() option: OptionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.option.key].valid;
  }
}
