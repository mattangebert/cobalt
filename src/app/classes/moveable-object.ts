export interface Point2D {
    /**
     * X coorinate in a 2D coordinate system
     */
    x: number;
    /**
     * Y coorinate in a 2D coordinate system
     */
    y: number;
}

export interface Boundaries {
    /**
     * Top boundarie of object
     */
    top: number;
    /**
     * Bottom boundarie of object
     */
    bottom: number;
    /**
     * Right boundarie of object
     */
    right: number;
    /**
     * Left boundarie of object
     */
    left: number;
}

/**
 * Abstract Class to define MoveableObjects for an 2Dimensianal Room like Canvas
 */
export abstract class MoveableObject {
    constructor(
        private height: number,
        private width: number,
        private maxSpeed: number,
        private position: Point2D ) {

    }

    /**
     * Move the Object according to given speedRatio
     *
     * @param speedRatio The 2D SpeedRatio Vector the Object should move towards
     */
    public move( speedRatio: Point2D): void {
        this.position.x += this.maxSpeed * speedRatio.x;
        this.position.y += this.maxSpeed * speedRatio.y;
    }

    /**
     * Get current Position
     * @return current 2D position
     */
    public getPosition(): Point2D {
        return this.position;
    }

    /**
     * Get collision boundaries of object at current Position
     * @return the collsion boundaries
     */
    public getCollisionBoundaries(): Boundaries {
        return {
            top: this.position.y - this.height / 2,
            bottom: this.position.y + this.height / 2,
            right: this.position.x + this.width / 2,
            left: this.position.x - this.width / 2,
        };
    }

    /**
     * Get objects width
     * @return width
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * Get objects height
     * @return height
     */
    public getHeight(): number {
        return this.height;
    }

}
