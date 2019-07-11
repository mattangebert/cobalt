import { Ball } from './ball';

let ball: Ball;

describe('Ball', () => {
  beforeEach(() => {
    ball = new Ball(15, 15, 2 , {x: 50, y: 50}, {x: 1, y: 1});
  });

  it('should create an instance', () => {
    expect(ball).toBeTruthy();
  });

  it('should return speedRatio x = 1 & y = 1', () => {
    const speedRatio = ball.getSpeedRatio();
    expect(speedRatio.x).toBe(1);
    expect(speedRatio.y).toBe(1);
  });

  it('should reverse speedRatio.x', () => {
    ball.reverseX();
    expect(ball.getSpeedRatio().x).toBe(-1);

    ball.reverseX();
    expect(ball.getSpeedRatio().x).toBe(1);
  });

  it('should reverse speedRatio.y', () => {
    ball.reverseY();
    expect(ball.getSpeedRatio().y).toBe(-1);

    ball.reverseY();
    expect(ball.getSpeedRatio().y).toBe(1);
  });

  it('should set speedRatio.y to 10', () => {
    ball.setVerticalSpeedRatio(10);
    expect(ball.getSpeedRatio().y).toBe(10);
  });

  it('should be called', () => {
    spyOn(ball, 'move');

    ball.move();

    expect(ball.move).toHaveBeenCalledTimes(1);
  });
});
