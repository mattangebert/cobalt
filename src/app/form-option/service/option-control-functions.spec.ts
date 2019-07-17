import { toFormGroup } from './option-control-functions';
import { OptionInput } from '../model/option-input';
// todo test for required ... how ???

describe('toFormGroup', () => {
  it('should be created (unrequired)', () => {
    const option = new OptionInput({
      key: 'test1',
      label: 'Test 1',
      type: 'number',
      value: 100,
      required: false,
      min: 10,
      max: 600,
      order: 3
    });

    const form = toFormGroup([option]);

    expect(form).toBeTruthy();
  });

  it('should be created with no value set', () => {
    const option = new OptionInput({
      key: 'test2',
      label: 'Test 2',
      type: 'text',
      required: false,
    });

    const form = toFormGroup([option]);

    expect(form).toBeTruthy();
  });

  it('should be created (required)', () => {
    const option = new OptionInput({
      key: 'test2',
      label: 'Test 2',
      type: 'text',
      value: 'blub',
      required: true,
    });

    const form = toFormGroup([option]);

    expect(form).toBeTruthy();
  });

  it('should be created (required) with no value set', () => {
    const option = new OptionInput({
      key: 'test2',
      label: 'Test 2',
      type: 'text',
      required: true,
    });

    const form = toFormGroup([option]);

    expect(form).toBeTruthy();
  });
});

