
import { OptionBase } from './option-base';

export class OptionCheckbox extends OptionBase<string> {
    controlType = 'checkbox';

    constructor(options: {} = {}) {
        super(options);
    }
}
