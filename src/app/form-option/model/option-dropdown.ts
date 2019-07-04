import { OptionBase } from './option-base';

export class OptionDropdown extends OptionBase<string> {
    controlType = 'dropdown';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options)
        this.options = options['options'] || [];
    }
}
