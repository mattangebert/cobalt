import { OptionBase } from './option-base';

/**
 * class to define a Select
 * ========================
 *
 * can be Html Select, Select multi or radio buttons
 *
 * extending {@link OptionBase}
 */
export class OptionSelect extends OptionBase<string> {
    /**
     * controlType for selects
     */
    public controlType = 'select';
    /**
     * option to be rendered in select
     */
    public options: {
        /**
         * uniqe id for select option
         */
        key: string,
        /**
         * value for select option
         */
        value: string }[] = [];

    /**
     * Select type to define used html type.
     * Can be select, multi or radio
     */
    public type: string;
    /**
     * start value of select has to be one of options values
     */
    public value;

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.type = options['type'] || '';

        if (!this.options.find((opt) => opt.value === this.value)) {
            this.value = null;
        }
    }
}
