import { MoveableObject } from './moveable-object';

describe('MoveableObject', () => {
  it('should create an instance', () => {
    class myClass extends MoveableObject {
      // class extending abstact class
    }
    expect(new myClass(0, 0, 0, {x: 0, y: 0})).toBeTruthy();
  });
});
