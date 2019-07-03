import { MoveableObject, Point2D } from '../../classes/moveable-object';

export class Paddle extends MoveableObject {
    private speedRatio: Point2D;

    constructor(
        height: number,
        width: number,
        maxSpeed: number,
        position: Point2D,
    ){
        super(height, width, maxSpeed, position);
        this.speedRatio = { x: 0, y: 0};
    }

    accelerateDown(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this.speedRatio.y = Math.min(1, this.speedRatio.y + ratioChange)
        this.move();
    }

    accelerateUp(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this.speedRatio.y = Math.max(-1, this.speedRatio.y - ratioChange)
        this.move();
    }

    declerate(ratioChange: number): void {
        if (this.speedRatio.y < 0) {
            this.speedRatio.y = Math.min(this.speedRatio.y + ratioChange, 0);
        }

        if (this.speedRatio.y > 0) {
            this.speedRatio.y = Math.max(this.speedRatio.y - ratioChange, 0);
        }

        this.move();
    }

    move(): void {
        super.move(this.speedRatio);
    }
}
