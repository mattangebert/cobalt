import { Ball } from './ball';
import { Paddle } from './paddle';
import { Boundaries } from '../../classes/moveable-object';
import { PongOptionService } from '../services/pong-option.service';

export interface PongControlStates {
    /**
     * control for paddleOne
     */
    controlOne: PongControlState;
    /**
     * control for paddleTwo
     */
    controlTwo: PongControlState;
}

interface PongControlState {
    /**
     * if key to move up is pressed
     */
    upPressed: boolean;
    /**
     * if key to move down is pressed
     */
    downPressed: boolean;
}

interface Score {
    /**
     * score of playerOne
     */
    playerOne: number;
    /**
     * score of playerTwo
     */
    playerTwo: number;
}

/**
 * Class to create a pong game instance
 * ====================================
 */
export class PongGame {
    /**
     * Ball object in pong game
     */
    public ball: Ball;
    /**
     * Paddle of playerOne leftSide
     */
    public playerOnePaddle: Paddle;
    /**
     * Paddle of playerTwo rightSide
     */
    public playerTwoPaddle: Paddle;
    /**
     * Service to get game options
     */
    public pos: PongOptionService;
    /**
     * If game is currently running
     */
    public gameRunning: boolean;
    /**
     * The score of both players
     */
    private _score: Score;
    /**
     * Toggle direction ball moves at start
     */
    private toggleBallDirectionStart: boolean;
    /**
     * Height of canvas element
     */
    private height: number;
    /**
     * Width of canvas element
     */
    private width: number;
    /**
     * Offsets to let ai paddles catch ball with a ancle
     * Boolean to teterminate if new offset should be set
     */
    private offsets = { playerOne: 0, playerTwo: 0, isPositive: true };

    constructor(
        height: number,
        width: number,
        pos: PongOptionService
    ) {
        this.height = height;
        this.width = width;
        this.pos = pos;
        this._score = {
            playerOne: 0,
            playerTwo: 0
        };
        this.gameRunning = false;
        this.toggleBallDirectionStart = false;
        this.pos.initializeOptions();
        this.resetCanvas();
    }

    /**
     * Initialize|reset Canvas with a ball and two paddles
     */
    public resetCanvas(): void {
        const paddleLeftOption = this.pos.options.paddleLeft;
        const paddleRightOption = this.pos.options.paddleRight;

        this.playerOnePaddle =  new Paddle(
            paddleLeftOption.height,
            paddleLeftOption.width,
            paddleLeftOption.speed,
            {x: 50, y: this.height / 2 }
        );
        this.playerTwoPaddle =  new Paddle(
            paddleRightOption.height,
            paddleRightOption.width,
            paddleRightOption.speed,
            {x: this.width - 50, y: this.height / 2 }
        );

        this.initializeBall();
    }

    /**
     * One tick of a running game
     * let ball and paddles move & draw new positons
     * @param controlStates The controlStates for player movement
     */
    public tick(controlStates: PongControlStates): void {
        this.ball.move();

        this.handleMovement(controlStates);

        this.checkCollisions();
    }

    /**
     * Check if game is over
     * Set gameRunnin to false on game over
     * @return if game is over
     */
    public gameOver(): boolean {
        const collisionBoundaries = this.ball.getCollisionBoundaries();
        const condition = collisionBoundaries.left <= 0 || collisionBoundaries.right >= this.width;

        if (condition) {
            this.gameRunning = false;
            this.updateScore();
        }

        return condition;
    }

    /**
     * Get current score
     */
    get score(): Score {
        return this._score;
    }

    /**
     * Update score points of players
     */
    private updateScore(): void {
        if (this.ball.getPosition().x > this.width / 2) {
            this._score.playerOne ++;
        }
        if (this.ball.getPosition().x < this.width / 2) {
            this._score.playerTwo ++;
        }
    }

    /**
     * initialize Ball
     */
    private initializeBall(): void {
        // todo speed or behavour adjustment for ai difficult

        let speed = this.pos.options.ballSpeed;
        if (this.pos.options.optimizeBallSpeed) {
            speed = Math.min(this.pos.options.paddleLeft.speed, this.pos.options.paddleRight.speed) * ((this.width - 100) / this.height);
            // speed = (speed / 20) * 21;
        }

        this.ball =  new Ball(15, 15, speed, { x: this.width / 2, y: this.height / 2 }, { x: 1, y: 0 });
        if (this.toggleBallDirectionStart) {
            this.ball =  new Ball(15, 15, speed,
                { x: this.width / 2, y: this.height / 2}, { x: -1, y: 0 });
            this.offsets.isPositive = false;
        }
        this.toggleBallDirectionStart = !this.toggleBallDirectionStart;
    }

    /**
     * Handle movement of players and ai paddles
     * @param controlStates The controlStates for player movement
     */
    private handleMovement(controlStates: PongControlStates): void {
        this.getOffsets();

        // single Player
        if (this.pos.options.isPlayerOne !== this.pos.options.isPlayerTwo) {
            const mergedControll: PongControlState = {upPressed: false, downPressed: false};

            mergedControll.upPressed = controlStates.controlOne.upPressed || controlStates.controlTwo.upPressed;
            mergedControll.downPressed = controlStates.controlOne.downPressed || controlStates.controlTwo.downPressed;

            if (this.pos.options.isPlayerOne) {
                this.handleControl(mergedControll, this.playerOnePaddle);
            }
            if (this.pos.options.isPlayerTwo) {
                this.handleControl(mergedControll, this.playerTwoPaddle);
            }
        }

        // multiplayer
        if (this.pos.options.isPlayerOne && this.pos.options.isPlayerTwo) {
            this.handleControl(controlStates.controlOne, this.playerOnePaddle);
            this.handleControl(controlStates.controlTwo, this.playerTwoPaddle);
        }

        // computer
        if (!this.pos.options.isPlayerOne) {
            this.movePaddle(this.playerOnePaddle, this.offsets.playerOne);
        }
        if (!this.pos.options.isPlayerTwo) {
            this.movePaddle(this.playerTwoPaddle, this.offsets.playerTwo);
        }
    }

    /**
     * Handle player paddle movememnt
     * @param controlState The controlState of the player
     * @param paddle The paddle of the player
     */
    private handleControl(controlState: PongControlState, paddle: Paddle, ): void {
        const paddleBounds: Boundaries = paddle.getCollisionBoundaries();

        if (controlState.upPressed && paddleBounds.top > 0) {
            paddle.accelerateUp(.03);

        } else if (controlState.downPressed && paddleBounds.bottom < this.height) {
            paddle.accelerateDown(.03);

        } else {
            paddle.declerate(.05);
        }
    }

    /**
     * Get a random offset in the paddles height aiming to hit the ball at
     * @param paddle The paddle the offset is for
     * @return The random offset
     */
    private getOffset(paddle: Paddle): number {
        return this.getRndInteger(0, paddle.getHeight() / 2) * ( Math.round(Math.random()) * 2 - 1 );
    }

    /**
     * Get new offsets for paddles if ball moves towards them
     */
    private getOffsets(): void {
        if (this.offsets.isPositive && this.ball.getSpeedRatio().y < 0) {
            this.offsets.playerOne = this.getOffset(this.playerOnePaddle);
            this.offsets.isPositive = !this.offsets.isPositive;
        }

        if (!this.offsets.isPositive && this.ball.getSpeedRatio().y > 0) {
            this.offsets.playerTwo = this.getOffset(this.playerTwoPaddle);
            this.offsets.isPositive = !this.offsets.isPositive;
        }
    }

    /**
     * Move ai paddle with given offset towards ball
     * @param paddle The target paddle
     * @param offset The used offset for the paddle
     */
    private movePaddle(paddle: Paddle, offset: number): void {
        const paddleBounds =  paddle.getCollisionBoundaries();

        if (this.ball.getPosition().y < paddle.getPosition().y + offset && paddleBounds.top > 0) {
            paddle.accelerateUp(1);
        } else if (paddleBounds.bottom < this.height) {
            paddle.accelerateDown(1);
        }
    }

    /**
     * Get a random integer bertween min and max
     * @param min The minimal random value
     * @param max The maximal random value
     * @return The random value
     */
    private getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    /**
     * Check & handle collisions
     * Ball with border or paddle
     * Paddles with borders
     */
    private checkCollisions(): void {
        const ballBounds = this.ball.getCollisionBoundaries();
        const paddleBoundsOne =  this.playerOnePaddle.getCollisionBoundaries();
        const paddleBoundsTwo =  this.playerTwoPaddle.getCollisionBoundaries();

        // bounce of top|bottom
        if (ballBounds.bottom >= this.height && this.ball.getSpeedRatio().y >= 0) {
            this.ball.reverseY();
        }

        // bounce of top|bottom
        if (ballBounds.top <= 0 && this.ball.getSpeedRatio().y <= 0) {
            this.ball.reverseY();
        }

        // stop playerOne paddle on game borders
        if (paddleBoundsOne.top <= 0 || paddleBoundsOne.bottom >= this.height) {
            this.playerOnePaddle.declerate(1);
        }

        // stop playerTwo paddle on game border
        if (paddleBoundsTwo.top <= 0 || paddleBoundsTwo.bottom >= this.height) {
            this.playerTwoPaddle.declerate(1);
        }

        // playerOnePaddle hit ball
        this.checkPaddleBallCollision(this.playerOnePaddle, false);

        // playerTwoPaddle hit ball
        this.checkPaddleBallCollision(this.playerTwoPaddle, true);

    }

    /**
     * Check collision between ball and paddle
     * Reverse ball x direction if collision
     * @param paddle The paddle to check collsions with
     * @param ballMovesRightwards If ball is moving towards right
     */
    private checkPaddleBallCollision(paddle: Paddle, ballMovesRightwards: boolean): void {
        const paddleBounds =  paddle.getCollisionBoundaries();
        const ballBounds = this.ball.getCollisionBoundaries();

        const leftBox = paddleBounds.right < ballBounds.right ? paddleBounds : ballBounds; // get box that is further left
        const rightBox = paddleBounds.right < ballBounds.right ? ballBounds : paddleBounds; // get box that is furher right

        const condition = !(leftBox.right < rightBox.left && leftBox.right < rightBox.right) &&
            ballBounds.top <= paddleBounds.bottom &&
            ballBounds.bottom >= paddleBounds.top;

        if ( condition ) {
            // let ball only fly toward enemy
            const reverseCondtion = ballMovesRightwards ? this.ball.getSpeedRatio().x > 0 : this.ball.getSpeedRatio().x < 0;
            if (reverseCondtion) { this.ball.reverseX(); }

          /* Set vertical speed ratio by taking ratio of
          * dist(centerOfBall, centerOfPaddle) to dist(topOfPaddle, centerOfPaddle)
          * Negate because pixels go up as we go down
          */
          let vsr = - (this.ball.getPosition().y - paddle.getPosition().y) / (paddleBounds.top - paddle.getPosition().y);
          vsr = Math.min(vsr, 1);
          this.ball.setVerticalSpeedRatio(vsr);
        }

    }
}
