import { TestBed } from '@angular/core/testing';
import { PongOptionService } from '../services/pong-option.service';
import { PongGame, PongControlStates } from './pong-game';
import { Ball } from './ball';
import { Paddle } from './paddle';

describe('PongGame', () => {
  let posStub: Partial<PongOptionService>;
  let pongGame: PongGame;
  let pos: PongOptionService;
  let controlStates: PongControlStates;

  beforeEach(() => {
    posStub = {
      isPlayerOne: true,
      isPlayerTwo: false,
      paddleLeftOption: {
        height: 100,
        width: 20,
        speed: 2
      },
      paddleRightOption: {
        height: 100,
        width: 20,
        speed: 2
      }
    };

    pos = TestBed.get(PongOptionService);

    pongGame = new PongGame(600, 800, pos);

    controlStates = {
      controlOne: {
        upPressed: false,
        downPressed: false
      },
      controlTwo: {
        upPressed: false,
        downPressed: false
      }
    };

  });

  /**
   * resetCanvas()
   */
  it('should be called on construct', () => {
    const spy = spyOn(PongGame.prototype, 'resetCanvas');

    pongGame = new PongGame(600, 800, pos);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should initialize 2 Paddles', () => {
    expect(pongGame.playerOnePaddle).toBeTruthy();
    expect(pongGame.playerTwoPaddle).toBeTruthy();
  });

  it('should initialize a Ball', () => {
    expect(pongGame.ball).toBeTruthy();
  });

  it('should set first initalize ball with positive speedRatio.x', () => {
    expect(pongGame.ball.getSpeedRatio().x).toBeGreaterThan(0);
  });

  it('should toggle ball speedRatio.x on multible calls', () => {
    pongGame.resetCanvas();
    expect(pongGame.ball.getSpeedRatio().x).toBeLessThan(0);
    pongGame.resetCanvas();
    expect(pongGame.ball.getSpeedRatio().x).toBeGreaterThan(0);
  });

  /****************************************************************************************************************************************
   * tick()
   ****************************************************************************************************************************************/
  it('should call ball.move', () => {
    const spy = spyOn(pongGame.ball, 'move');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  /** Single Player PlayerOne ------------------------------------------------------------------------------------------------------------*/
  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne & playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & downPressed & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne downPressed & playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerTwo upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne downPressed & playerTwo upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateUp when singlePlayer = playerOne and playerOne & playerTwo -> upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateDown when singlePlayer = playerOne and playerOne downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateDown when singlePlayer = playerOne and playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.accelerateDown when singlePlayer = playerOne and playerOne & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call payerOnePaddle.declerate when singlePlayer = playerOne and nothing pressed',
  () => {
    const spyOne = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = false;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(1); // <--
  });

  /** Single Player PlayerTwo ------------------------------------------------------------------------------------------------------------*/
  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne & playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne upPressed & downPressed & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne downPressed & playerTwo upPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerTwo upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne downPressed & playerTwo upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateUp when singlePlayer = playerOne and playerOne & playerTwo -> upPressed & downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.upPressed = true;
    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(1); // <--
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateDown when singlePlayer = playerOne and playerOne downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateDown when singlePlayer = playerOne and playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerTwoPaddle.accelerateDown when singlePlayer = playerOne and playerOne & playerTwo downPressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(1); // <--
    expect(spyThree).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle.declerate when singlePlayer = playerOne and nothing pressed',
  () => {
    const spyOne = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyTwo = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyThree = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spyOne).toHaveBeenCalledTimes(0);
    expect(spyTwo).toHaveBeenCalledTimes(0);
    expect(spyThree).toHaveBeenCalledTimes(1); // <--
  });

  /* Multiplayer -------------------------------------------------------------------------------------------------------------------------*/
  it('should call playerOnePaddle accelerateUp and playerTwoPaddle declerate when Multiplayer and playerOne upPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(1); // <--
  });

  it('should call playerOnePaddle accelerateUp and playerTwoPaddle acclerateUp when Multiplayer and playerOne & playerTwo upPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle accelerateUp and playerTwoPaddle acclerateDown ' +
    'when Multiplayer and playerOne upPressed & playerTwo downPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.upPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle accelerateDown and playerTwoPaddle declerate when Multiplayer and playerOne downPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(1); // <--
  });

  it('should call playerOnePaddle accelerateDown and playerTwoPaddle accelerateUp ' +
  'when Multiplayer and playerOne downPressed & playerTwo upPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle accelerateDown and playerTwoPaddle accelerateDown when Multiplayer and playerOne & playerTwo downPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlOne.downPressed = true;
    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle declerate and playerTwoPaddle declerate when Multiplayer',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(1); // <--
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(1); // <--
  });

  it('should call playerOnePaddle declerate and playerTwoPaddle accelerateUp when Multiplayer and playerTwo upPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlTwo.upPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(1); // <--
    expect(spyP2One).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call playerOnePaddle declerate and playerTwoPaddle accelerateDown when Multiplayer and playerTwo downPressed',
  () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = true;
    pos.isPlayerTwo = true;

    controlStates.controlTwo.downPressed = true;

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(1); // <--
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  /* Ai Control Movmement ----------------------------------------------------------------------------------------------------------------*/
  it('should call paddle accelerateUp when ball is higher', () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = false;

    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 0}, {x: 1, y: 0}); // higher means y is smaller

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Two).toHaveBeenCalledTimes(0);
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Two).toHaveBeenCalledTimes(0);
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should call paddle accelerateUp when ball is lower', () => {
    const spyP1One = spyOn(pongGame.playerOnePaddle, 'accelerateUp');
    const spyP1Two = spyOn(pongGame.playerOnePaddle, 'accelerateDown');
    const spyP1Three = spyOn(pongGame.playerOnePaddle, 'declerate');
    const spyP2One = spyOn(pongGame.playerTwoPaddle, 'accelerateUp');
    const spyP2Two = spyOn(pongGame.playerTwoPaddle, 'accelerateDown');
    const spyP2Three = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pos.isPlayerOne = false;
    pos.isPlayerTwo = false;

    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 800}, {x: 1, y: 0}); // lower means y is greater

    pongGame.tick(controlStates);

    expect(spyP1One).toHaveBeenCalledTimes(0);
    expect(spyP1Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP1Three).toHaveBeenCalledTimes(0);
    expect(spyP2One).toHaveBeenCalledTimes(0);
    expect(spyP2Two).toHaveBeenCalledTimes(1); // <--
    expect(spyP2Three).toHaveBeenCalledTimes(0);
  });

  it('should move paddleOne to ball with + a offset', () => {
    pos.isPlayerOne = false;
    pos.isPlayerTwo = false;

    for (let i = 0; i < 200; i++) { // 200 ticks should be enough to reach the ball
      pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 100}, {x: 1, y: -1});
      pongGame.tick(controlStates);
    }

    const dist = Math.abs(pongGame.playerOnePaddle.getPosition().y - pongGame.ball.getPosition().y);
    expect(dist).toBeLessThan(pongGame.playerOnePaddle.getHeight());
  });

  it('should move paddleTwo to ball with + a offset', () => {
    pos.isPlayerOne = false;
    pos.isPlayerTwo = false;

    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 100}, {x: 1, y: -1}); // move one time to set offsets.isPositive to false
    pongGame.tick(controlStates);

    for (let i = 0; i < 200; i++) { // 200 ticks should be enough to reach the ball
      pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 100}, {x: 1, y: 1});
      pongGame.tick(controlStates);
    }

    const dist = Math.abs(pongGame.playerTwoPaddle.getPosition().y - pongGame.ball.getPosition().y);
    expect(dist).toBeLessThan(pongGame.playerTwoPaddle.getHeight());
  });

  /* Collisions --------------------------------------------------------------------------------------------------------------------------*/
  it('should bounce ball of top when moving upwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 0}, {x: 1, y: -1}); // y: 0 => top border

    const spy = spyOn(pongGame.ball, 'reverseY');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not bounce ball when moving upwards while not reaching the top border', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 15}, {x: 1, y: -1});

    const spy = spyOn(pongGame.ball, 'reverseY');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should bounce ball of bottom when moving downwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 600}, {x: 1, y: 1}); // y: 600 => bottom border

    const spy = spyOn(pongGame.ball, 'reverseY');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not bounce ball when moving downward while not reaching the bottom border', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 585}, {x: 1, y: 1});

    const spy = spyOn(pongGame.ball, 'reverseY');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should bounce ball of left paddle when moving leftwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 60, y: 300}, {x: -1, y: 1}); // paddle starts at 50 + width => x: 60

    const spy = spyOn(pongGame.ball, 'reverseX');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not bounce ball when moving leftwards if doesnt reach paddle', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 70, y: 300}, {x: -1, y: 1});

    const spy = spyOn(pongGame.ball, 'reverseX');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not bounce ball when moving leftwards if paddle isnt in y reach', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 60, y: 300}, {x: -1, y: 1});
    pongGame.playerOnePaddle =  new Paddle(100, 20, 2, {x: 50, y: 100});

    const spy = spyOn(pongGame.ball, 'reverseX');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not bounce ball of left paddle when moving rightwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 5, y: 300}, {x: 1, y: 1});

    const spy = spyOn(pongGame.ball, 'reverseX');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should bounce ball of right paddle when moving rightwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 740, y: 300}, {x: 1, y: 1}); // paddle starts at -50 - width => x: 740

    const spy = spyOn(pongGame.ball, 'reverseX');
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not bounce ball when moving rightwards if doesnt reach paddle', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 725, y: 300}, {x: 1, y: 1});

    const spy = spyOn(pongGame.ball, 'reverseX');
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not bounce ball when moving rightwards if paddle isnt in y reach', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 740, y: 300}, {x: 1, y: -1});
    pongGame.playerTwoPaddle =  new Paddle(100, 20, 2, {x: 750, y: 100});

    const spy = spyOn(pongGame.ball, 'reverseX');
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should not bounce ball of right paddle when moving leftwards', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 740, y: 300}, {x: -1, y: 1});

    const spy = spyOn(pongGame.ball, 'reverseX');
    pos.isPlayerTwo = true;

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should stop playerOnePaddle on top', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: -100}, {x: 1, y: 1}); // ball way out top
    pongGame.playerOnePaddle =  new Paddle(100, 20, 2, {x: 50, y: 0});

    const spy = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = false;
    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should stop playerOnePaddle on bottom', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 700}, {x: 1, y: 1}); // ball way out bottom
    pongGame.playerOnePaddle =  new Paddle(100, 20, 2, {x: 50, y: 600});

    const spy = spyOn(pongGame.playerOnePaddle, 'declerate');

    pos.isPlayerOne = false;
    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should stop playerTwoPaddle on top', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: -100}, {x: 1, y: 1}); // ball way out top
    pongGame.playerTwoPaddle =  new Paddle(100, 20, 2, {x: 750, y: 0});

    const spy = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should stop playerTwpPaddle on bottom', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 400, y: 700}, {x: 1, y: 1}); // ball way out bottom
    pongGame.playerTwoPaddle =  new Paddle(100, 20, 2, {x: 750, y: 600});

    const spy = spyOn(pongGame.playerTwoPaddle, 'declerate');

    pongGame.tick(controlStates);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  /****************************************************************************************************************************************
   * get score()
   ****************************************************************************************************************************************/
  it('should return score playerOne = 0 playerTwo = 0', () => {
    const score = pongGame.score;

    expect(score.playerOne).toBe(0);
    expect(score.playerTwo).toBe(0);
  });

  /****************************************************************************************************************************************
   * gameOver()
   ****************************************************************************************************************************************/
  it('should return false when game is running', () => {
    expect(pongGame.gameOver()).toBeFalsy();
  });

  it('should return gameOver true when ball runs out left side', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 2, y: 100}, {x: -1, y: 0});

    pongGame.tick(controlStates);

    expect(pongGame.gameOver()).toBeTruthy();

  });

  it('should return gameOver true when ball runs out rigth side', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 798, y: 100}, {x: 1, y: 0});

    pongGame.tick(controlStates);

    expect(pongGame.gameOver()).toBeTruthy();
  });

  it('should increase playerOne score by 1 if ball runs out right side', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 798, y: 100}, {x: 1, y: 0});

    pongGame.tick(controlStates);
    pongGame.gameOver();

    const score = pongGame.score;

    expect(score.playerOne).toBe(1);
    expect(score.playerTwo).toBe(0);
  });

  it('should increase playerTwo score by 1 if ball runs out left side', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 2, y: 100}, {x: -1, y: 0});
    pongGame.tick(controlStates);
    pongGame.gameOver();

    const score = pongGame.score;

    expect(score.playerOne).toBe(0);
    expect(score.playerTwo).toBe(1);
  });

  it('should return score 2:1', () => {
    pongGame.ball = new Ball(15, 15, 2, {x: 798, y: 100}, {x: 1, y: 0});
    pongGame.tick(controlStates);
    pongGame.gameOver();
    pongGame.ball = new Ball(15, 15, 2, {x: 2, y: 100}, {x: -1, y: 0});
    pongGame.tick(controlStates);
    pongGame.gameOver();
    pongGame.ball = new Ball(15, 15, 2, {x: 798, y: 100}, {x: 1, y: 0});
    pongGame.tick(controlStates);
    pongGame.gameOver();

    const score = pongGame.score;

    expect(score.playerOne).toBe(2);
    expect(score.playerTwo).toBe(1);
  });
});
