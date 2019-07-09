import { Injectable } from '@angular/core';
import { OptionBase } from '../model/option-base';
import { OptionTextbox } from '../model/option-textbox';
import { OptionSelect } from '../model/option-select';

@Injectable()
export class OptionService {

  // TODO outsource to DB
  // TODO make ansynchronous

  getOptions() {
    let options: OptionBase<any>[] = [

      new OptionSelect({
        key: 'player1',
        label: 'Player One',
        type: 'radio',
        required: true,
        value: 'Player',
        options: [
          { key: 'player', value: 'Player' },
          { key: 'computer', value: 'Computer' }
        ],
        order: 1
      }),

      new OptionSelect({
        key: 'player2',
        label: 'Player Two',
        type: 'radio',
        required: true,
        value: 'Computer',
        options: [
          { key: 'player', value: 'Player' },
          { key: 'computer', value: 'Computer' }
        ],
        order: 2
      }),

      
    ];

    return options.sort((a, b) => a.order - b.order);
  }
}
