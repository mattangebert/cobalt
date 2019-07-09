import { OptionBase } from './option-base';

export class OptionSelect extends OptionBase<string> {
    controlType = 'select';
    options: { key: string, value: string }[] = [];
    type: string;
    value;

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.type = options['type'] || '';

        if (!this.options.find((opt) => { return opt.value === this.value; })) {
            this.value = null;
        }
    }
}