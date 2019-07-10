import { OptionBase } from './option-base';

export class OptionInput extends OptionBase<string> {
    controlType = 'input';
    type: string;
    min: number;
    max: number;

    constructor(options: {} = {}) {
        super(options)
        this.type = options['type'] || '';

        if (this.type === 'number') {
            this.min = options['min'] || '';
            this.max = options['max'] || '';
        }
    }
}
