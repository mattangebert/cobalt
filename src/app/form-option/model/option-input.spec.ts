import { OptionInput } from './option-input';

describe('OptionInput', () => {
  it('should create an instance', () => {
    expect(new OptionInput()).toBeTruthy();
  });

  it('should create input with min max on type number', () => {
    const inp = new OptionInput({
      type: 'number',
      min: 0,
      max: 10
    });

    expect(inp.min).toBe(0);
    expect(inp.max).toBe(10);
  });

  it('should create input min & max = \'\' on type number if not set', () => {
    const inp = new OptionInput({
      type: 'number',
    });

    expect('' + inp.min).toBe('');
    expect('' + inp.max).toBe('');
  });
});
