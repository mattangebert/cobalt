import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PongGame, PongControlState } from './classes/pong-game';
import { Boundaries } from '../classes/moveable-object';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {
  @ViewChild('pongCanvas', { static: true }) canvasElement: ElementRef

  public width: number = 800;
  public height: number = 600;

  private context: CanvasRenderingContext2D;
  private pongGame: PongGame;
  private ticksPerSecond: number = 60;
  private controlState: PongControlState;
  private keyUp: Array<string> = ['w', 'ArrowUp'];
  private keyDown: Array<string> = ['s', 'ArrowDown']

  constructor() { 
    this.pongGame = new PongGame(this.height, this.width);
    this.controlState = {upPressed: false, downPressed: false}
  }

  ngOnInit() {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.renderFrame();

    setInterval(() => {
      this.pongGame.tick(this.controlState);
    }, 1 / this.ticksPerSecond);
  }

  renderFrame(): void {
    if (this.pongGame.gameOver()) {
      this.context.font = "30px Arial";
      this.context.fillText("Game Over!", 50, 50);
      //setTimeout(() => location.reload(), 500);
      return;
    }

    // Draw Background
    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(0, 0, this.width, this.height);

    // Set to white for game objects
    this.context.fillStyle = 'rgb(255,255,255)';

    let bounds: Boundaries;

    // Draw player paddle
    let paddleObj = this.pongGame.playerPaddle;
    bounds = paddleObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, paddleObj.getWidth(), paddleObj.getHeight());

    // Draw enemy paddle
    let enemyObj = this.pongGame.enemyPaddle;
    bounds = enemyObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, enemyObj.getWidth(), enemyObj.getHeight());

    // Draw ball
    let ballObj = this.pongGame.ball;
    bounds = ballObj.getCollisionBoundaries();
    //this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());
    this.context.arc(bounds.left, bounds.top, 8, 0 ,2 * Math.PI)
    this.context.fill();
    this.context.beginPath();
    // Render next frame
    window.requestAnimationFrame(() => this.renderFrame());
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.keyUp.indexOf(event.key) !== -1) {
      this.controlState.upPressed = true;
    }

    if (this.keyDown.indexOf(event.key) !== -1) {
      this.controlState.downPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent2(event: KeyboardEvent) {
    if (this.keyUp.indexOf(event.key) !== -1) {
      this.controlState.upPressed = false;
    }

    if (this.keyDown.indexOf(event.key) !== -1) {
      this.controlState.downPressed = false;
    }
  }

}
