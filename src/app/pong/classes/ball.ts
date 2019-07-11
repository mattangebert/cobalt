import { MoveableObject, Point2D } from '../../classes/moveable-object';

export class Ball extends MoveableObject {
    private speedRatio: Point2D;

    constructor(
        height: number,
        width: number,
        maxSpeed: number,
        position: Point2D,
        speedRatio: Point2D
    ) {
        super(height, width, maxSpeed, position);
        this.speedRatio = speedRatio;
    }

    reverseX(): void {
        this.speedRatio.x = - this.speedRatio.x;
    }

    reverseY(): void {
        this.speedRatio.y = - this.speedRatio.y;
    }

    setVerticalSpeedRatio(verticalSpeedRatio: number): void {
        this.speedRatio.y = verticalSpeedRatio;
    }

    move(): void {
        super.move(this.speedRatio);
    }

    getSpeedRatio(): Point2D {
        return this.speedRatio;
    }
}
