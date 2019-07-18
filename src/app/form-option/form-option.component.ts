import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { toFormGroup } from './service/option-control-functions';
import { OptionBase } from './model/option-base';
import { FormGroup } from '@angular/forms';

/**
 * Component to create dynamic form
 * ================================
 *
 * Used to create dynamic form in other components or templates
 *
 * ## Examples
 * #### example.component.html
 * Here we use the component in a html file of another component.
 * options will be defined in the coresponding component.ts file
 * ``` typescript
 * <app-form-option #formIdentifier [options]="options"></app-form-option>
 * ```
 *
 * #### example.component.ts
 * Here we define the component to use the dynamic form and give it a variable holding the form options elements.
 * ``` typescript
 * // ...
 * export class ExampleComponent {
 * @ViewChild('formIdentifier', { static: true}) public formOptionComp: FormOptionComponent;
 *
 * // ...
 * public options: OptionBase<any>[];
 * ...
 * ```
 * Here we set the options for our form
 * ``` typescript
 * ...
 * options = [
 *   new OptionInput({
 *    key: 'name',
 *    label: 'name',
 *    type: 'text',
 *    order: 1
 *  }),
 *  new OptionInput({
 *    key: 'number',
 *    label: 'your lucky number',
 *    type: 'number',
 *    min: 0,
 *    max: 100,
 *    required: true,
 *    order: 2
 *  }),
 * ]
 * ```
 */
@Component({
  selector: 'app-form-option',
  templateUrl: './form-option.component.html',
  styleUrls: ['./form-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOptionComponent implements OnInit {

  /**
   * array of options for form as form elements
   */
  @Input() public options: OptionBase<any>[] = [];
  /**
   * forms formGroup
   */
  public form: FormGroup;
  /**
   * variable to print form values as json to template
   */
  public payLoad = '';

  constructor() { }

  /**
   * initialise Compomet with options as FormGroup
   */
  public ngOnInit(): void {
    this.form = toFormGroup(this.options);
  }

  /**
   * save form values as json in variable payLoad on for submit
   */
  public onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.value);
  }

  /**
   * tracks option for angular ngFor
   */
  public trackByFn(index: number, item: OptionBase<any>): string {
    return item.key;
  }
}
