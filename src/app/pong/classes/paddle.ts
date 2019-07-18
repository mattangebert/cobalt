import { MoveableObject, Point2D } from '../../classes/moveable-object';

export class Paddle extends MoveableObject {
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

    get speedRatio(): Point2D {
        return this._speedRatio;
    }

    public accelerateDown(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this._speedRatio.y = Math.min(1, this._speedRatio.y + ratioChange);
        this.move();
    }

    public accelerateUp(ratioChange: number): void {
        if (ratioChange < 0 || ratioChange > 1) {
            return;
        }

        this._speedRatio.y = Math.max(-1, this._speedRatio.y - ratioChange);
        this.move();
    }

    public declerate(ratioChange: number): void {
        if (this._speedRatio.y < 0) {
            this._speedRatio.y = Math.min(this._speedRatio.y + ratioChange, 0);
        }

        if (this._speedRatio.y > 0) {
            this._speedRatio.y = Math.max(this._speedRatio.y - ratioChange, 0);
        }

        this.move();
    }

    public move(): void {
        super.move(this._speedRatio);
    }
}
