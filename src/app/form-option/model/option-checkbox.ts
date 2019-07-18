
import { OptionBase } from './option-base';

/**
 * class to define a Checkbox
 * ==========================
 *
 * extending {@link OptionBase}
 */
export class OptionCheckbox extends OptionBase<string> {
    /**
     * controlType for checkboxes
     */
    public controlType = 'checkbox';

    constructor(options: {} = {}) {
        super(options);
    }
}
