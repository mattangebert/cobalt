import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PongGame, PongControlStates, PongOptions } from './classes/pong-game';
import { Boundaries } from '../classes/moveable-object';
import { OptionService } from '../form-option/service/option.service';
import { FormOptionComponent } from '../form-option/form-option.component';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss'],
  providers: [ OptionService ]
})
export class PongComponent implements OnInit {
  @ViewChild('pongCanvas', { static: true }) canvasElement: ElementRef
  @ViewChild('optionForm', { static: true}) form: FormOptionComponent;

  options: any[];

  public width: number = 800;
  public height: number = 600;

  private context: CanvasRenderingContext2D;
  private pongGame: PongGame;
  private ticksPerSecond: number = 60;
  private controlStates: PongControlStates;
  private interval;

  constructor(optionService : OptionService) {
    this.pongGame = new PongGame(this.height, this.width);
    this.controlStates = { 
      controlOne: {upPressed: false, downPressed: false}, 
      controlTwo: {upPressed: false, downPressed: false}, 
    } 
    this.options = optionService.getOptions();
  }

  ngOnInit() {
    this.initialiseGame();
  }

  ngAfterViewInit() {
    this.form.getForm().valueChanges.forEach(
      (value: string) => {
        const options: PongOptions = {
          playerOne: {
            isPlayer: value['player1'] === 'player'
          },
          playerTwo: {
            isPlayer: value['player2'] === 'player'
          }
        }

        this.pongGame.setOptions(options);
      }
    );
  }

  initialiseGame() {
    this.context = this.canvasElement.nativeElement.getContext('2d');
    this.renderFrame();
  }

  startGame()
  {
    if(this.interval) {
      clearInterval(this.interval);
      this.pongGame.resetCanvas();
      this.initialiseGame();
    }
     
    this.interval = setInterval(() => {
      this.pongGame.tick(this.controlStates);
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
    let paddleObj = this.pongGame.playerOnePaddle;
    bounds = paddleObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, paddleObj.getWidth(), paddleObj.getHeight());

    // Draw enemy paddle
    let enemyObj = this.pongGame.playerTwoPaddle;
    bounds = enemyObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, enemyObj.getWidth(), enemyObj.getHeight());

    // Draw ball
    let ballObj = this.pongGame.ball;
    bounds = ballObj.getCollisionBoundaries();
    //this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());
    
    
    this.context.arc(bounds.left, bounds.top, 5, 0 ,2 * Math.PI)
    this.context.fill();
    this.context.beginPath();


    // Render next frame
    window.requestAnimationFrame(() => this.renderFrame());
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ('w' == event.key) {
      this.controlStates.controlOne.upPressed = true;
    }
    if ('s' == event.key) {
      this.controlStates.controlOne.downPressed = true;
    }
    if ('ArrowUp' == event.key) {
      this.controlStates.controlTwo.upPressed = true;
    }
    if ('ArrowDown' == event.key) {
      this.controlStates.controlTwo.downPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent2(event: KeyboardEvent) {
    if ('w' == event.key) {
      this.controlStates.controlOne.upPressed = false;
    }
    if ('s' == event.key) {
      this.controlStates.controlOne.downPressed = false;
    }
    if ('ArrowUp' == event.key) {
      this.controlStates.controlTwo.upPressed = false;
    }
    if ('ArrowDown' == event.key) {
      this.controlStates.controlTwo.downPressed = false;
    }
  }

  onClickSubmit(formData) {
    console.log(formData);
 }
}
