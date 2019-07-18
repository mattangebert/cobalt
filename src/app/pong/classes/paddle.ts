import { MoveableObject, Point2D } from '../../classes/moveable-object';

/**
 * Class to define paddle object for a pong game
 * =============================================
 */
export class Paddle extends MoveableObject {
     /**
     * SpeedRatio in x and y to hanlde movement speed.
     */
    private _speedRatio: Point2D;

    constructor(
        height: number,
        width: number,
        maxSpeed: number,
        position: Point2D,
    ) {
        super(height, width, maxSpeed, position);
        this._speedRatio = { x: 0, y: 0};
    }

    /**
     * Get current speedRatio
     */
    get speedRatio(): Point2D {
        return this._speedRatio;
    }

    /**
     * Moves paddle downwards
     * @param ratioChange The amount the speedRatio.y should change downwards
     */
    public accelerateDown(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this._speedRatio.y = Math.min(1, this._speedRatio.y + ratioChange);
        this.move();
    }

    /**
     * Moves paddle upwards
     * @param ratioChange The amount the speedRatio.y should change upwards
     */
    public accelerateUp(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this._speedRatio.y = Math.max(-1, this._speedRatio.y - ratioChange);
        this.move();
    }

    /**
     * Slow downs & stops paddle from moving
     * @param ratioChange The amount the paddle should declerate by
     */
    public declerate(ratioChange: number): void {
        if (this._speedRatio.y < 0) {
            this._speedRatio.y = Math.min(this._speedRatio.y + ratioChange, 0);
        }

        if (this._speedRatio.y > 0) {
            this._speedRatio.y = Math.max(this._speedRatio.y - ratioChange, 0);
        }

        this.move();
    }

    /**
     * Move paddle in speedRatio direction
     */
    public move(): void {
        super.move(this._speedRatio);
    }
}
