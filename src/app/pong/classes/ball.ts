import { MoveableObject, Point2D } from '../../classes/moveable-object';

/**
 * Class to define ball object for a pong game
 * ===========================================
 */
export class Ball extends MoveableObject {
    /**
     * speedRatio in x and y to hanlde movement speed
     */
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

    /**
     * reverse speedRatio.x to make ball move in opposite x direction
     */
    public reverseX(): void {
        this.speedRatio.x = - this.speedRatio.x;
    }

    /**
     * reverse speedRatio.y to make ball move in opposite y direction
     */
    public reverseY(): void {
        this.speedRatio.y = - this.speedRatio.y;
    }

    /**
     * Set speedRatio.y to new Value
     * @param verticalSpeedRatio The new value for speedRatio.y
     */
    public setVerticalSpeedRatio(verticalSpeedRatio: number): void {
        this.speedRatio.y = verticalSpeedRatio;
    }

    /**
     * move ball in speedRatio direction
     */
    public move(): void {
        super.move(this.speedRatio);
    }

    /**
     * get current speedRatio
     * @return current speedRatio
     */
    public getSpeedRatio(): Point2D {
        return this.speedRatio;
    }
}
