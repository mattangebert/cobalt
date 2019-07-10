import { Injectable } from '@angular/core';
import { OptionBase } from '../model/option-base';
import { OptionInput } from '../model/option-input';
import { OptionSelect } from '../model/option-select';

@Injectable()
export class OptionService {

  options: OptionBase<any>[] = [];
  // TODO outsource to DB
  // TODO make ansynchronous

  constructor(){
    this.setPongoptions();
  }

  setOptions(options: OptionBase<any>[]) {
    this.options = options;
  }

  getOptions(): OptionBase<any>[] {
    return this.options;
  }

  private setPongoptions(): void {
    let options: OptionBase<any>[] = [

      new OptionSelect({
        key: 'player1',
        label: 'Player One',
        type: 'radio',
        required: true,
        value: 'player',
        options: [
          { key: 'player', value: 'player' },
          { key: 'computer', value: 'computer' }
        ],
        order: 1
      }),

      new OptionSelect({
        key: 'player2',
        label: 'Player Two',
        type: 'radio',
        required: true,
        value: 'computer',
        options: [
          { key: 'player', value: 'player' },
          { key: 'computer', value: 'computer' }
        ],
        order: 2
      }),

      new OptionInput({
        key: 'paddleLeftHeight',
        label: 'Left Paddel Height',
        type: 'number',
        value: 100,
        min: 10,
        max: 600,
        order: 3
      }),

      new OptionInput({
        key: 'paddleLeftSpeed',
        label: 'Left Paddel Speed',
        type: 'number',
        value: 1.5,
        min: 0,
        max: 5,
        step: 0.1,
        order: 4
      }),

      new OptionInput({
        key: 'paddleRightHeight',
        label: 'Right Paddel Height',
        type: 'number',
        value: 100,
        min: 10,
        max: 600,
        order: 5
      }),

      new OptionInput({
        key: 'paddleRightSpeed',
        label: 'Right Paddel Speed',
        type: 'number',
        value: 1.5,
        min: 0,
        max: 5,
        step: 0.1,
        order: 6
      }),
    ];

    this.setOptions(options.sort((a, b) => a.order - b.order));
  }
}
