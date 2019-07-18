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

    public reverseX(): void {
        this.speedRatio.x = - this.speedRatio.x;
    }

    public reverseY(): void {
        this.speedRatio.y = - this.speedRatio.y;
    }

    public setVerticalSpeedRatio(verticalSpeedRatio: number): void {
        this.speedRatio.y = verticalSpeedRatio;
    }

    public move(): void {
        super.move(this.speedRatio);
    }

    public getSpeedRatio(): Point2D {
        return this.speedRatio;
    }
}
