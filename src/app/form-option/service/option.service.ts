import { Injectable } from '@angular/core';
import { OptionBase } from '../model/option-base';
import { OptionInput } from '../model/option-input';
import { OptionSelect } from '../model/option-select';
import { OptionCheckbox } from '../model/option-checkbox';

/**
 * Service providing options for form-option component
 * ================================================
 */
@Injectable({
    providedIn: 'root'
})
export class OptionService {

  /**
   * array of options to create form elements for dynamic form
   */
  public options: OptionBase<any>[] = [];
  // TODO outsource to DB
  // TODO make ansynchronous

  constructor() {
    this.setPongoptions();
  }

  /**
   * creates options for PongGame
   */
  private setPongoptions(): void {
    const options: OptionBase<any>[] = [

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
        step: 10,
        order: 3
      }),

      new OptionInput({
        key: 'paddleLeftSpeed',
        label: 'Left Paddel Speed',
        type: 'number',
        value: 2.0,
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
        step: 10,
        order: 5
      }),

      new OptionInput({
        key: 'paddleRightSpeed',
        label: 'Right Paddel Speed',
        type: 'number',
        value: 2.0,
        min: 0,
        max: 5,
        step: 0.1,
        order: 6
      }),

      new OptionCheckbox({
        key: 'optimizeBallSpeed',
        label: 'Optimized Ball Speed',
        value: true,
        order: 7
      }),

      new OptionInput({
        key: 'ballSpeed',
        label: 'Ball Speed',
        type: 'number',
        value: 2,
        min: 0,
        max: 10,
        step: .1,
        order: 8
      }),

      new OptionInput({
        key: 'pointsToWin',
        label: 'Points needed to win',
        type: 'number',
        value: 3,
        min: 1,
        max: 99,
        order: 9
      }),
    ];

    this.options = options.sort((a, b) => a.order - b.order);
  }
}
