/**
 * Class to define form option
 * ===========================
 *
 * ## Example to extend from OptionBase
 * #### .ts file
 * We extend the OptionBase and give it a type in this case <string>.
 * To tell our html when to render this from option we define a unique controlType.
 * Additional option parameters like "placeholder" can be define as public variable and be set in constructor.
 *
 * ```typescript
 * // ...
 * export class OptionTextTest extends OptionBase<string> {
 * // ...
 *  public controlType = 'textTest';
 * // ...
 *  public placeholder: string;
 *
 *  constructor(options: {} = {}) {
 *      super(options);
 *      this.placeholder = options['placeholder'] || '';
 *   }
 * }
 * ```
 *
 * #### form-option-element html
 * to be able to render our new form option we need to define the new switch case in form-option-element.html
 * inside the ngSwitch as new case.
 * The *ngSwitchCase statment euqals the controlType we set in our class.
 * ```typescript
 * ...
 * <div [ngSwitch]="option.controlType" class="form-element-inner-wrapper">
 * ...
 *  <input *ngSwitchCase="'textTest'" [formControlName]="option.key" type="text" [id]="option.key"/>
 * ...
 * </div>
 * ...
 * ```
 *
 * #### use element in a form
 * Here we define a options array and create a new OptionTextTest which we can give an form-option.comonent to render
 * ```typescript
 * // ...
 * const options: OptionBase<any>[] = [
 *  new OptionTextTest({
 *      key: 'testExample',
 *      label: 'example label',
 *      value: '',
 *      placeholder: 'type in something',
 *      order: 1
 *  }),
 * ]
 * ```
 */
export class OptionBase<T> {
    /**
     * value of form element
     */
    public value: T;
    /**
     * unique id for element
     */
    public key: string;
    /**
     * label shown in frontend
     */
    public label: string;
    /**
     * if form element is required
     */
    public required: boolean;
    /**
     * order form elements get printed out in
     */
    public order: number;
    /**
     * controlType used in ngSwitch to teterminate form element type.
     * has to be not used in any other form element yet
     */
    public controlType: string;

    constructor(options: {
        /**
         * start value for form element or empty
         */
        value?: T;
        /**
         * unique id for element or empty
         */
        key?: string;
        /**
         * label to be shown or empty
         */
        label?: string;
        /**
         * if form element is required
         */
        required?: boolean;
        /**
         * order element should be printed out default = 1
         */
        order?: number;
        /**
         * controlType to identify OptionType for ngSwitch
         */
        controlType?: string;
    } = {}) {
        this.value = options.value,
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}
