import { OptionBase } from './option-base';

export class OptionInput extends OptionBase<string> {
    controlType = 'input';
    type: string;
    min: number;
    max: number;
    step: number;

    constructor(options: {} = {}) {
        super(options)
        this.type = options['type'] || '';

        if (this.type === 'number') {
            this.min = options['min'] !== undefined ? options['min'] : '';
            this.max = options['max'] !== undefined ? options['max'] : '';
            this.step = options['step'] || 1;
        }
    }
}
