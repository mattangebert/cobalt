import { Paddle } from './paddle';

let paddle: Paddle;

describe('Paddle', () => {
  beforeEach(() => {
    paddle =  new Paddle(100, 20, 2, {x: 10, y: 50});
  });

  it('should create an instance', () => {
    expect(paddle).toBeTruthy();
  });

  /**
   * accelerateDown()
   */
  it('should acclerate downward by .5', () => {
    // downard is positive axis
    paddle.accelerateDown(.5);
    expect(paddle.speedRatio.y).toBe(.5);
  });

  it('should acclerate downward at max 1', () => {
    paddle.accelerateDown(.9);
    paddle.accelerateDown(.9);
    expect(paddle.speedRatio.y).toBe(1);
  });

  it('should not acclerate downward if param > 1', () => {
    paddle.accelerateDown(2);
    expect(paddle.speedRatio.y).toBe(0);
  });

  it('should not acclerate downward if param < 0', () => {
    paddle.accelerateDown(-1);
    expect(paddle.speedRatio.y).toBe(0);
  });

  /**
   * accelerateUp()
   */
  it('should acclerate upward by .5', () => {
    // upward is negative axis
    paddle.accelerateUp(.5);
    expect(paddle.speedRatio.y).toBe(-.5);
  });

  it('should acclerate upward at max -1', () => {
    paddle.accelerateUp(.9);
    paddle.accelerateUp(.9);
    expect(paddle.speedRatio.y).toBe(-1);
  });

  it('should not acclerate upward if param > 1', () => {
    paddle.accelerateUp(2);
    expect(paddle.speedRatio.y).toBe(0);
  });

  it('should not acclerate upward if param < 0', () => {
    paddle.accelerateUp(-1);
    expect(paddle.speedRatio.y).toBe(0);
  });

  /**
   * decelerate()
   */
  it('shoulld decelerate to .25 after accelerate downward', () => {
    paddle.accelerateDown(.5);
    paddle.declerate(.25);
    expect(paddle.speedRatio.y).toBe(.25);

  });

  it('shoulld stop declerating before going backwards after accelerate downward', () => {
    paddle.accelerateDown(.5);
    paddle.declerate(.9);
    expect(paddle.speedRatio.y).toBe(0);
  });

  it('shoulld decelerateto -.25 after accelerate upward', () => {
    paddle.accelerateUp(.5);
    paddle.declerate(.25);
    expect(paddle.speedRatio.y).toBe(-.25);
  });

  it('shoulld stop declerating before going backwards after accelerate upward', () => {
    paddle.accelerateUp(.5);
    paddle.declerate(.9);
    expect(paddle.speedRatio.y).toBe(0);
  });

  /**
   * move()
   */
  it('should be called', () => {
    spyOn(paddle, 'move');

    paddle.move();

    expect(paddle.move).toHaveBeenCalledTimes(1);
  });
});
