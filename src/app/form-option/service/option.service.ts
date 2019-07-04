import { Injectable } from '@angular/core';
import { OptionBase } from '../model/option-base';
import { OptionDropdown } from '../model/option-dropdown';
import { OptionTextbox } from '../model/option-textbox';

@Injectable()
export class OptionService {

  // TODO outsource to DB
  // TODO make ansynchronous

  getOptions() {
    let options: OptionBase<any>[] = [

      new OptionDropdown({
        key: 'game',
        label: 'game to play',
        options: [
          { key: 'pong', value: 'pong' },
          { key: 'squash', value: 'squash' },
          { key: 'empty', value: 'empty' },
        ],

        order: 3
      }),

      new OptionTextbox({
        key: 'playerName',
        label: 'Player Name',
        value: 'Player',
        required: true,
        order: 1
      }),

      new OptionTextbox({
        key: 'cheatCode',
        label: 'cheat',
        order: 4
      }),

      new OptionTextbox({
        key: 'email',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return options.sort((a, b) => a.order - b.order);
  }
}
