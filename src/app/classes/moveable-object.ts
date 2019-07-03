export interface Point2D {
    x: number;
    y: number;
}

export interface Boundaries {
    top: number;
    bottom: number;
    right: number;
    left: number;
}

export abstract class MoveableObject {
    constructor(
        private height: number,
        private width: number,
        private maxSpeed: number,
        private position: Point2D ){

    }

    move( speedRatio: Point2D): void {
        this.position.x += this.maxSpeed * speedRatio.x;
        this.position.y += this.maxSpeed * speedRatio.y;
    }

    getPosition(): Point2D {
        return this.position;
    }

    getCollisionBoundaries(): Boundaries {
        return {
            top: this.position.y - this.height / 2,
            bottom: this.position.y + this.height / 2,
            right: this.position.x + this.width / 2,
            left: this.position.x - this.width / 2,
        }
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

}
