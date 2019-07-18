import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { PongGame, PongControlStates } from './classes/pong-game';
import { Boundaries } from '../classes/moveable-object';
import { OptionService } from '../form-option/service/option.service';
import { FormOptionComponent } from '../form-option/form-option.component';
import { PongOptionService, PongOption } from './services/pong-option.service';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss'],
})
export class PongComponent implements OnInit, AfterViewInit {
  @ViewChild('pongCanvas', { static: true }) public canvasElement: ElementRef;
  @ViewChild('optionForm', { static: true}) public formOptionComp: FormOptionComponent;

  public options: any[];

  public width = 800;
  public height = 600;

  public pongGame: PongGame;

  private context: CanvasRenderingContext2D;
  private ticksPerSecond = 60;
  private _controlStates: PongControlStates;
  private interval: NodeJS.Timer;
  private start: any;
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

  public ngOnInit(): void {
    this.initialiseGame();
  }

  public ngAfterViewInit(): void {
    this.formOptionComp.form.valueChanges.forEach(
      (value: string) => {
        this.pongOptions.isPlayerOne = value['player1'] === 'player';
        this.pongOptions.isPlayerTwo = value['player2'] === 'player';

        this.pongOptions.paddleLeft = {height: value['paddleLeftHeight'], width: 20, speed: value['paddleLeftSpeed']};
        this.pongOptions.paddleRight = {height: value['paddleRightHeight'], width: 20, speed: value['paddleRightSpeed']};
      }
    );
  }

  get controlStates(): PongControlStates {
    return this._controlStates;
  }

  public initialiseGame(): void {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.renderFrame();
  }

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

  public renderFrame(): void {
    if (this.pongGame.gameOver()) {
      this.renderScore(); // render end score
      this.renderGameOver(); // render GameOver info

      clearInterval(this.interval);

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
    // this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());

    this.context.arc(bounds.left, bounds.top, 5, 0 , 2 * Math.PI);
    this.context.fill();
    this.context.beginPath();

    // Render next frame
    window.requestAnimationFrame(() => this.renderFrame());
  }

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

  private renderGameOver(): void {
      this.context.fillStyle = 'rgb(255,255,255)';
      this.context.font = '30px Arial';
      this.context.textAlign = 'center';
      this.context.fillText('Space bar to continue', this.width / 2, this.height - 80);
      this.context.fillText('F5 for new Game', this.width / 2, this.height - 40);

      this.context.font = '50px Arial';
      this.context.fillText('Game Over!', this.width / 2, this.height / 2);
      this.context.font = '20px Arial';
      const end = new Date();
      this.context.fillText(((end.getTime() - this.start.getTime()) / 1000) + 's', this.width / 2, this.height / 2 + 30);
  }

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
