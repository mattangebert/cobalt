import { OptionBase } from './option-base';

/**
 * class to define Inputs
 * ==========================
 *
 * extending {@link OptionBase}
 */
export class OptionInput extends OptionBase<string> {
    /**
     * controlType for Inputs
     */
    public controlType = 'input';
    /**
     * Input tpye can be any valid input types (text, number ...)
     */
    public type: string;
    /**
     * Input min value only used when type = number
     */
    public min: number;
    /**
     * Input max value only used when type = number
     */
    public max: number;
    /**
     * Input step value only used when type = number, default = 1
     */
    public step: number;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';

        if (this.type === 'number') {
            this.min = options['min'] !== undefined ? options['min'] : '';
            this.max = options['max'] !== undefined ? options['max'] : '';
            this.step = options['step'] || 1;
        }
    }
}
