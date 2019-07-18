import { Component, Input,  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionBase } from '../model/option-base';

/**
 * Class to create dynamic form elements
 * =====================================
 */
@Component({
  selector: 'app-form-option-element',
  templateUrl: './form-option-element.component.html',
  styleUrls: ['./form-option-element.component.scss']
})
export class FormOptionElementComponent {
  /**
   * Options to be apllied to form element
   */
  @Input() public option: OptionBase<any>;
  /**
   * FormGroup the element belongs to
   */
  @Input() public form: FormGroup;

  /**
   * get is form element valid
   * @return validation of form element
   */
  get isValid(): boolean {
    return this.form.controls[this.option.key].valid;
  }

  /**
   * tracks option for angular ngFor
   */
  public trackByFn(index: number, item: OptionBase<any>): string {
    return item.key;
  }
}
