import { Ball } from './ball';
import { Paddle } from './paddle';
import { Boundaries } from '../../classes/moveable-object';

export interface PongControlState {
    upPressed: boolean,
    downPressed: boolean
}


export class PongGame {
    public ball: Ball;
    public playerPaddle: Paddle;
    public enemyPaddle: Paddle;

    private height: number;
    private width: number;

    constructor(
        height: number,
        width: number
    ){
        this.height = height;
        this.width = width;

        this.ball =  new Ball(15, 15, 1.9, { x: height / 2, y: width / 2 }, { x: 1, y: 1 });
        this.playerPaddle =  new Paddle(100, 20, 1.5, {x: 50, y: height / 2 });
        this.enemyPaddle =  new Paddle(100, 20, 1.3, {x: width - 50, y: height / 2 });
    }

    tick(controlState: PongControlState): void {
        this.ball.move();

        let paddleBounds: Boundaries = this.playerPaddle.getCollisionBoundaries();

        if (controlState.upPressed && paddleBounds.top > 0) {
            this.playerPaddle.accelerateUp(.03);

        } else if (controlState.downPressed && paddleBounds.bottom < this.height) {
            this.playerPaddle.accelerateDown(.03);

        } else {
            this.playerPaddle.declerate(.05);
        }

        this.moveEnemyPaddle();
        this.checkCollisions();
    }

    private moveEnemyPaddle(): void { 
        let paddleBounds =  this.enemyPaddle.getCollisionBoundaries();
       
        if (this.ball.getPosition().y < this.enemyPaddle.getPosition().y && paddleBounds.top > 0) {
            this.enemyPaddle.accelerateUp(1)
        } else if (paddleBounds.bottom < this.height) { 
            this.enemyPaddle.accelerateDown(1)
        }

    }

    private checkCollisions(): void {
        let ballBounds = this.ball.getCollisionBoundaries();
        let paddleBounds =  this.playerPaddle.getCollisionBoundaries();

        // bounce of top|bottom
        if (ballBounds.bottom >= this.height && this.ball.getSpeedRatio().y >= 0) {
            this.ball.reverseY();
        }

        // bounce of top|bottom
        if (ballBounds.top <= 0 && this.ball.getSpeedRatio().y <= 0) {
            this.ball.reverseY();
        }


        // stop player paddle on game borders
        if (paddleBounds.top <= 0 || paddleBounds.bottom >= this.height) {
            this.playerPaddle.declerate(1);
        }

        // playerPaddle hit ball
        this.checkPaddleBallCollision(this.playerPaddle, false);

        // enemyPaddle hit ball
        this.checkPaddleBallCollision(this.enemyPaddle, true);

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
