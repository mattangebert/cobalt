import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionBase } from '../model/option-base';

export function toFormGroup( options: OptionBase<any>[] ): FormGroup {
  const group: any = {};

  options.forEach(option => {
    group[option.key] = new FormControl(option.value || '');

    if (option.required) {
      group[option.key] = new FormControl(option.value || '', Validators.required);
    }
  });

  return new FormGroup(group);
}
