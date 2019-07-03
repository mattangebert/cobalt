import { PongGame } from './pong-game';

describe('PongGame', () => {
  it('should create an instance', () => {
    expect(new PongGame(600, 800)).toBeTruthy();
  });
});
