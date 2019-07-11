import { MoveableObject } from './moveable-object';

class MyClass extends MoveableObject {
  // class extending abstact class
}

let myTestClass;

beforeEach(() => {
  myTestClass = new MyClass(100, 20, 2, {x: 10, y: 10});
});


describe('MoveableObject', () => {

  it('should create an instance', () => {
    expect(myTestClass).toBeTruthy();
  });

  it('should return height, 100', () => {
    const height =  myTestClass.getHeight();
    expect(height).toBe(100);
  });

  it('should return width, 20', () => {
    const width =  myTestClass.getWidth();
    expect(width).toBe(20);
  });

  it('should return current position in x and y', () => {
    const position = myTestClass.getPosition();
    expect(position.x).toBe(10);
    expect(position.y).toBe(10);
  });

  it('should move position according to speed by speedRatio', () => {
    const speedRatio = {x: 2, y: 2};
    myTestClass.move(speedRatio);
    const position = myTestClass.getPosition();
    expect(position.x).toBe(14); // 10 *= 2 * 2
    expect(position.y).toBe(14);
  });

  it('should return its\'s collision boundaries', () => {
    const boundaries = myTestClass.getCollisionBoundaries();
    expect(boundaries.top).toBe(-40); // oups
    expect(boundaries.bottom).toBe(60);
    expect(boundaries.right).toBe(20);
    expect(boundaries.left).toBe(0);
  });
});
