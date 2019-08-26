import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { PongGame, PongControlStates } from './classes/pong-game';
import { Boundaries } from '../classes/moveable-object';
import { OptionService } from '../form-option/service/option.service';
import { FormOptionComponent } from '../form-option/form-option.component';
import { PongOptionService, PongOption } from './services/pong-option.service';
import { OptionBase } from '../form-option/model/option-base';
import { timer } from 'rxjs';

/**
 * Component to create a pong game
 */
@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PongComponent implements OnInit, AfterViewInit {
  /**
   * Canvas element reference for pong game
   */
  @ViewChild('pongCanvas', { static: true }) public canvasElement: ElementRef;
  /**
   * Component to render & handle form for pong game options
   */
  @ViewChild('optionForm', { static: true}) public formOptionComp: FormOptionComponent;
  /**
   * Array holding form options elements
   */
  public options: OptionBase<any>[];
  /**
   * width of canvas
   */
  public width = 800;
  /**
   * height of canvas
   */
  public height = 600;
  /**
   * Instance of current pong game
   */
  public pongGame: PongGame;
  /**
   * Pong game canvas context to draw on
   */
  private context: CanvasRenderingContext2D;
  /**
   * Intervall amount 1/ticksPerSecond
   */
  private ticksPerSecond = 60;
  /**
   * ControlStates for user movment
   */
  private _controlStates: PongControlStates;
  /**
   * Intervall rendering ticks
   */
  private interval: NodeJS.Timer;
  /**
   * Time game stared
   */
  private start: Date;
  /**
   * Options for pong game
   */
  private pongOptions: PongOption;

  constructor(optionService: OptionService, pos: PongOptionService) {
    this.pongGame = new PongGame(this.height, this.width, pos);
    this._controlStates = {
      controlOne: {upPressed: false, downPressed: false},
      controlTwo: {upPressed: false, downPressed: false},
    };
    this.options = optionService.options;
    this.pongOptions = pos.getOptions();
  }

  /**
   * Call initaliseGame
   */
  public ngOnInit(): void {
    this.initialiseGame();
  }

  /**
   * Listen to form option changes
   */
  public ngAfterViewInit(): void {
    this.formOptionComp.form.valueChanges.forEach(
      (value: string) => {
        this.pongOptions.isPlayerOne = value['player1'] === 'player';
        this.pongOptions.isPlayerTwo = value['player2'] === 'player';

        this.pongOptions.paddleLeft = {height: value['paddleLeftHeight'], width: 20, speed: value['paddleLeftSpeed']};
        this.pongOptions.paddleRight = {height: value['paddleRightHeight'], width: 20, speed: value['paddleRightSpeed']};

        this.pongOptions.optimizeBallSpeed = value['optimizeBallSpeed'];
        this.pongOptions.ballSpeed = value['ballSpeed'];

        this.pongOptions.pointsToWin = value['pointsToWin'];
      }
    );
  }

  /**
   * Get controlStates for user movement
   * @return current controlStates
   */
  get controlStates(): PongControlStates {
    return this._controlStates;
  }

  /**
   * Initialize context & canvas
   */
  public initialiseGame(): void {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.renderFrame();
  }

  /**
   * Start a new game
   * Returns if game still running
   */
  public startGame(): void {
    if ( this.pongGame.gameRunning ) {
      return;
    }

    this.start = new Date();
    this.pongGame.pos.setOptions(this.pongOptions);
    this.pongGame.gameRunning = true;
    this.pongGame.resetCanvas();

    if (this.interval) {
      clearInterval(this.interval);
      this.initialiseGame();
    }
    this.interval = setInterval(() => {
      this.pongGame.tick(this._controlStates);
    }, 1 / this.ticksPerSecond);
  }

  /**
   * Handles Rendering for objects and information on Canvas
   */
  public renderFrame(): void {
    if (this.pongGame.gameOver()) {
      this.renderScore(); // render end score

      clearInterval(this.interval);

      if ( this.pongGame.score.playerOne >= this.pongOptions.pointsToWin ||
          this.pongGame.score.playerTwo >= this.pongOptions.pointsToWin ) {
            this.renderGameOver(); // render GameOver info
      } else {
        this.restartGame();
      }

      return;
    }

    // Draw Background
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(0, 0, this.width, this.height);

    // Set to white for game objects
    this.context.fillStyle = 'rgb(255,255,255)';

    this.renderScore(); // render score before obbjects get drawn to be in background

    let bounds: Boundaries;

    // Draw player paddle
    const paddleObj = this.pongGame.playerOnePaddle;
    bounds = paddleObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, paddleObj.getWidth(), paddleObj.getHeight());

    // Draw enemy paddle
    const enemyObj = this.pongGame.playerTwoPaddle;
    bounds = enemyObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, enemyObj.getWidth(), enemyObj.getHeight());

    // Draw ball
    const ballObj = this.pongGame.ball;
    bounds = ballObj.getCollisionBoundaries();
    //this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());

    this.context.arc(bounds.left, bounds.top, Math.max(this.pongGame.ball.getHeight(), this.pongGame.ball.getWidth()) / 2, 0 , 2 * Math.PI);
    this.context.fill();
    this.context.beginPath();

    // Render next frame
    window.requestAnimationFrame(() => this.renderFrame());
  }

  /**
   * Counts down to restart game
   */
  private restartGame(): void {
    const restartTimer = timer(0, 1000);
    let secondToRestart = 3;
    this.renderDuration();

    const test = restartTimer.subscribe((x) => {
      // erase old countdown
      this.context.fillStyle = 'rgb(0,0,0)';
      this.context.fillRect( this.width / 2 - 50, this.height / 2 - 50, 100, 100);

      this.context.fillStyle = 'rgb(255,255,255)';
      this.context.font = '50px Arial';
      this.context.fillText((secondToRestart) + '', this.width / 2, this.height / 2);

      secondToRestart --;

      if (secondToRestart < 0) {
        test.unsubscribe();
        this.startGame();
      }
    });
  }

  /**
   * Renders current score on canvas
   */
  private renderScore(): void {
    // erase old scoe
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(this.width / 6, 0, (this.width / 6) * 4, 50);

    // write score
    this.context.fillStyle = 'rgb(255,255,255)';
    const score = this.pongGame.score;
    this.context.font = '30px Arial';
    this.context.textAlign = 'center';
    this.context.fillText(score.playerOne + ' : ' + score.playerTwo , this.width / 2, 50);
  }

  /**
   * Renders game over infomration on canvas
   */
  private renderGameOver(): void {
      this.context.fillStyle = 'rgb(255,255,255)';
      this.context.font = '30px Arial';
      this.context.textAlign = 'center';
      this.context.fillText('Space bar to continue', this.width / 2, this.height - 80);
      this.context.fillText('F5 for new Game', this.width / 2, this.height - 40);

      this.context.font = '50px Arial';
      this.context.fillText('Game Over!', this.width / 2, this.height / 2);
      this.renderDuration();

      this.pongGame.resetScore();
  }

  /**
   * Render duration of game
   */
  private renderDuration():void {
    this.context.fillStyle = 'rgb(255,255,255)';
    this.context.font = '20px Arial';
    const end = new Date();
    this.context.fillText(((end.getTime() - this.start.getTime()) / 1000) + 's', this.width / 2, 80 /*this.height / 2 + 30*/);
  }

  /**
   * Listens to user keydown events and updates controlStates
   * @param event Keys user presses down
   */
  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if ('KeyW' === event.code) {
      this._controlStates.controlOne.upPressed = true;
    }
    if ('KeyS' === event.code) {
      this._controlStates.controlOne.downPressed = true;
    }
    if ('ArrowUp' === event.code) {
      this._controlStates.controlTwo.upPressed = true;
    }
    if ('ArrowDown' === event.code) {
      this._controlStates.controlTwo.downPressed = true;
    }
  }

  /**
   * Listens to user keyup events and updates controlStates
   * @param event Keys user releases
   */
  @HostListener('window:keyup', ['$event'])
  public keyEvent2(event: KeyboardEvent): void {
    if ('KeyW' === event.code) {
      this._controlStates.controlOne.upPressed = false;
    }
    if ('KeyS' === event.code) {
      this._controlStates.controlOne.downPressed = false;
    }
    if ('ArrowUp' === event.code) {
      this._controlStates.controlTwo.upPressed = false;
    }
    if ('ArrowDown' === event.code) {
      this._controlStates.controlTwo.downPressed = false;
    }
    if ('Space' === event.code) {
      this.startGame();
    }
  }
}
