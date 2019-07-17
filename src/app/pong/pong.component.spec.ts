import { PongComponent } from './pong.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormOptionComponent } from '../form-option/form-option.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormOptionElementComponent } from '../form-option/form-option-element/form-option-element.component';
import { Ball } from './classes/ball';

describe('PongComponent', () => {
  let component: PongComponent;
  let fixture: ComponentFixture<PongComponent>;
  let formOptions: {
    player1: string,
    player2: string,
    paddleLeftHeight: number,
    paddleLeftSpeed: number,
    paddleRightHeight: number,
    paddleRightSpeed: number
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PongComponent, FormOptionComponent, FormOptionElementComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formOptions = component.formOptionComp.form.value;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * initialiseGame()
   */
  it('should call renderFrame', () => {
    const spy = spyOn(component, 'renderFrame');

    component.initialiseGame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  /**
   * renderFrame
   */
  it('should draw on window', () => {
    const spy = spyOn(window, 'requestAnimationFrame');

    component.renderFrame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should stop drawing when gameOver', () => {
    const spy = spyOn(window, 'requestAnimationFrame');

    component.startGame(); // to get startTime

    component.pongGame.ball = new Ball(15, 15, 2, {x: -1, y: 100}, {x: 1, y: 1});

    component.renderFrame();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should remove interval when gameOver', () => {
    const spy =  spyOn(window, 'clearInterval');

    component.startGame(); // to get startTime

    component.pongGame.ball = new Ball(15, 15, 2, {x: -1, y: 100}, {x: 1, y: 1});

    component.renderFrame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  /**
   * Option changes
   */
  it('should listen to isPlayerOne change', () => {
    expect(component.pongGame.pos.isPlayerOne).toBeTruthy();

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#player1computer');
    element.click();
    component.startGame();

    expect(component.pongGame.pos.isPlayerOne).toBeFalsy();
  });

  it('should listen to isPlayerTwo change', () => {
    expect(component.pongGame.pos.isPlayerTwo).toBeFalsy();

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#player2player');
    element.click();
    component.startGame();

    expect(component.pongGame.pos.isPlayerTwo).toBeTruthy();
  });

  it('should listen to paddleOne height change', () => {
    expect(component.pongGame.playerOnePaddle.getHeight()).toBe(100);

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#paddleLeftHeight');
    element.valueAsNumber = 213;
    element.dispatchEvent(new Event('input'));
    component.startGame();

    expect(Number(component.pongGame.playerOnePaddle.getHeight())).toBe(213);
  });

  it('should listen to paddleTwo height change', () => {
    expect(component.pongGame.playerTwoPaddle.getHeight()).toBe(100);

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#paddleRightHeight');
    element.valueAsNumber = 213;
    element.dispatchEvent(new Event('input'));
    component.startGame();

    expect(Number(component.pongGame.playerTwoPaddle.getHeight())).toBe(213);
  });

  it('should listen to paddleOne speed change', () => {
    expect(component.pongGame.pos.getOptions().paddleLeft.speed).toBe(2);

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#paddleLeftSpeed');
    element.valueAsNumber = 10;
    element.dispatchEvent(new Event('input'));
    component.startGame();

    expect(Number(component.pongGame.pos.getOptions().paddleLeft.speed)).toBe(10);
  });

  it('should listen to paddleTwo speed change', () => {
    expect(component.pongGame.pos.getOptions().paddleRight.speed).toBe(2);

    const element: HTMLInputElement = fixture.nativeElement.querySelector('#paddleRightSpeed');
    element.valueAsNumber = 10;
    element.dispatchEvent(new Event('input'));
    component.startGame();

    expect(Number(component.pongGame.pos.getOptions().paddleRight.speed)).toBe(10);
  });

  /**
   * startGame()
   */
  it('should call pos setOptions', () => {
    const spy = spyOn(component.pongGame.pos, 'setOptions');

    component.startGame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set gameRunning to rue', () => {
    component.startGame();

    expect(component.pongGame.gameRunning).toBeTruthy();
  });

  it('should call reset canvas', () => {
    const spy = spyOn(component.pongGame, 'resetCanvas');

    component.startGame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set an intervall & call tick', () => {
    const spy = spyOn(window, 'setInterval');

    component.startGame();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not start a new game while game still running', () => {
    component.startGame(); // first start

    const spy = spyOn(window, 'setInterval');
    component.startGame();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should clear intervall if game is restart after gameOver', () => {
    const spy = spyOn(window, 'clearInterval');

    component.startGame(); // first game
    component.pongGame.ball = new Ball(15, 15, 2, {x: -1, y: 100}, {x: 1, y: 1});
    component.pongGame.gameOver(); // check if gameOver = ture as ball is out of bounds
    component.startGame(); // second game

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should listen to keyDownEvent W & set controlOne upPressed', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'KeyW'
    }));

    expect(component.controlStates.controlOne.upPressed).toBeTruthy();

    window.dispatchEvent(new KeyboardEvent('keyup', {
      code: 'KeyW'
    }));

    expect(component.controlStates.controlOne.upPressed).toBeFalsy();
  });

  it('should listen to keyDownEvent S & set controlOne downPressed', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'KeyS'
    }));

    expect(component.controlStates.controlOne.downPressed).toBeTruthy();

    window.dispatchEvent(new KeyboardEvent('keyup', {
      code: 'KeyS'
    }));

    expect(component.controlStates.controlOne.downPressed).toBeFalsy();
  });

  it('should listen to keyDownEvent ArrowUp & set controlTwo upPressed', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'ArrowUp'
    }));

    expect(component.controlStates.controlTwo.upPressed).toBeTruthy();

    window.dispatchEvent(new KeyboardEvent('keyup', {
      code: 'ArrowUp'
    }));

    expect(component.controlStates.controlTwo.upPressed).toBeFalsy();
  });

  it('should listen to keyDownEvent ArrowDown & set controlTwo downPressed', () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'ArrowDown'
    }));

    expect(component.controlStates.controlTwo.downPressed).toBeTruthy();

    window.dispatchEvent(new KeyboardEvent('keyup', {
      code: 'ArrowDown'
    }));

    expect(component.controlStates.controlTwo.downPressed).toBeFalsy();
  });

  it('should call startGame when Space is released', () => {
    const spy = spyOn(component, 'startGame');

    window.dispatchEvent(new KeyboardEvent('keyup', {
      code: 'Space'
    }));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
