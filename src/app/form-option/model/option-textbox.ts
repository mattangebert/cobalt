import { OptionBase } from './option-base';

export class OptionTextbox extends OptionBase<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options)
        this.type = options['type'] || '';
    }
}
