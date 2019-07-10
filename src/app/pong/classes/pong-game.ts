import { Ball } from './ball';
import { Paddle } from './paddle';
import { Boundaries } from '../../classes/moveable-object';
import { PongOptionService } from '../services/pong-option.service';

export interface PongControlStates {
    controlOne: PongControlState,
    controlTwo: PongControlState
}

interface PongControlState {
    upPressed: boolean,
    downPressed: boolean,
}

export class PongGame {
    public ball: Ball;
    public playerOnePaddle: Paddle;
    public playerTwoPaddle: Paddle;
    public pos: PongOptionService;

    private height: number;
    private width: number;
    private offsets = { playerOne: 0, playerTwo: 0, isPositive: true };

    constructor(
        height: number,
        width: number,
        pos: PongOptionService
    ){
        this.height = height;
        this.width = width;
        this.pos = pos;
        this.pos.initializeOptions();

        this.resetCanvas();
    }

    resetCanvas() {
        this.ball =  new Ball(15, 15, 1.9, { x: this.height / 2, y: this.width / 2 }, { x: 1, y: 1 });

        const paddleLeftOption = this.pos.getPaddleLeftOption();
        const paddleRightOption = this.pos.getPaddleRightOption();

        this.playerOnePaddle =  new Paddle(paddleLeftOption.height, paddleLeftOption.width, paddleLeftOption.speed, {x: 50, y: this.height / 2 });
        this.playerTwoPaddle =  new Paddle(paddleRightOption.height, paddleRightOption.width, paddleRightOption.speed, {x: this.width - 50, y: this.height / 2 });
    }

    tick(controlStates: PongControlStates): void {
        this.ball.move();
 
        this.handleMovement(controlStates);

        this.checkCollisions();
    }

    private handleMovement(controlStates: PongControlStates) {
        this.getOffsets();

        // single Player
        if (this.pos.getIsPlayerOne() !== this.pos.getIsPlayerTwo()) {
            let mergedControll: PongControlState = {upPressed: false, downPressed: false};

            mergedControll.upPressed = controlStates.controlOne.upPressed || controlStates.controlTwo.upPressed;
            mergedControll.downPressed = controlStates.controlOne.downPressed || controlStates.controlTwo.downPressed;
            
            if (this.pos.getIsPlayerOne()) {
                this.handleControl(mergedControll, this.playerOnePaddle);
            }
            if (this.pos.getIsPlayerTwo()) {
                this.handleControl(mergedControll, this.playerTwoPaddle);
            }
        }

        // multiplayer
        if (this.pos.getIsPlayerOne() && this.pos.getIsPlayerTwo()) {
            this.handleControl(controlStates.controlOne, this.playerOnePaddle);
            this.handleControl(controlStates.controlTwo, this.playerTwoPaddle);
        }

        // computer
        if (!this.pos.getIsPlayerOne()) {
            this.movePaddle(this.playerOnePaddle, this.offsets.playerOne);
        }
        if (!this.pos.getIsPlayerTwo()) {
            this.movePaddle(this.playerTwoPaddle, this.offsets.playerTwo);
        }
    }

    private handleControl(controlState: PongControlState, paddle: Paddle, )
    {
        let paddleBounds: Boundaries = paddle.getCollisionBoundaries();

        if (controlState.upPressed && paddleBounds.top > 0) {
            paddle.accelerateUp(.03);

        } else if (controlState.downPressed && paddleBounds.bottom < this.height) {
            paddle.accelerateDown(.03);

        } else {
            paddle.declerate(.05);
        }
    }

    private getOffset(paddle: Paddle): number {
        return this.getRndInteger(0, paddle.getHeight() / 2) * ( Math.round(Math.random()) * 2 - 1 );
    }

    private getOffsets(): void
    {
        if (this.offsets.isPositive && this.ball.getSpeedRatio().y < 0) {
            this.offsets.playerOne = this.getOffset(this.playerOnePaddle);
            this.offsets.isPositive = !this.offsets.isPositive;
        } 
        
        if (!this.offsets.isPositive && this.ball.getSpeedRatio().y > 0) {
            this.offsets.playerOne = this.getOffset(this.playerTwoPaddle);
            this.offsets.isPositive = !this.offsets.isPositive;
        }
    }

    private movePaddle(paddle: Paddle, offset: number): void {
        let paddleBounds =  paddle.getCollisionBoundaries();
               
        if (this.ball.getPosition().y < paddle.getPosition().y + offset && paddleBounds.top > 0) {
            paddle.accelerateUp(1)
        } else if (paddleBounds.bottom + offset < this.height) { 
            paddle.accelerateDown(1)
        }
    }

    private getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    private checkCollisions(): void {
        let ballBounds = this.ball.getCollisionBoundaries();
        let paddleBounds =  this.playerOnePaddle.getCollisionBoundaries();

        // bounce of top|bottom
        if (ballBounds.bottom >= this.height && this.ball.getSpeedRatio().y >= 0) {
            this.ball.reverseY();
        }

        // bounce of top|bottom
        if (ballBounds.top <= 0 && this.ball.getSpeedRatio().y <= 0) {
            this.ball.reverseY();
        }


        // stop playerOne paddle on game borders
        if (paddleBounds.top <= 0 || paddleBounds.bottom >= this.height) {
            this.playerOnePaddle.declerate(1);
        }

        // playerOnePaddle hit ball
        this.checkPaddleBallCollision(this.playerOnePaddle, false);

        // playerTwoPaddle hit ball
        this.checkPaddleBallCollision(this.playerTwoPaddle, true);

    }

    private checkPaddleBallCollision(paddle: Paddle, reverse: boolean) {
        let paddleBounds =  paddle.getCollisionBoundaries();
        let ballBounds = this.ball.getCollisionBoundaries();
        
        let condition =  ballBounds.left <= paddleBounds.right &&
        paddleBounds.right - ballBounds.left <= 3 &&
        ballBounds.bottom >= paddleBounds.top &&
        ballBounds.top <= paddleBounds.bottom;


        if (reverse) {
            condition = ballBounds.right <= paddleBounds.left &&
            paddleBounds.left - ballBounds.right <= 3 &&
            ballBounds.bottom >= paddleBounds.top &&
            ballBounds.top <= paddleBounds.bottom;
        }

        if ( condition ) {
          this.ball.reverseX();

          /* Set vertical speed ratio by taking ratio of 
          * dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
          * Negate because pixels go up as we go down
          */
          let vsr = - (this.ball.getPosition().y - paddle.getPosition().y) / (paddleBounds.top - paddle.getPosition().y);
          vsr = Math.min(vsr, 1);
          this.ball.setVerticalSpeedRatio(vsr);
        }
        
    }

    gameOver(): boolean {
        let collisionBoundaries = this.ball.getCollisionBoundaries();

        return collisionBoundaries.left <= 0 || collisionBoundaries.right >= this.width;
    }
}
