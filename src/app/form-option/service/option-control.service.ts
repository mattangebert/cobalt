import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { OptionBase } from '../model/option-base';

@Injectable()
export class OptionControlService {
  constructor() { }

  toFormGroup( options: OptionBase<any>[] ) {
    let group: any = {}

    options.forEach(option => {
      group[option.key] = option.required ? new FormControl(option.value || '', Validators.required)
                                          : new FormControl(option.value || '');
    });
    return new FormGroup(group);
  }
}
