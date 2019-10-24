import { Sprite, SpriteOptions, SpritePosition } from '../sprite/sprite';


export interface CharacterSpriteOptions extends SpriteOptions {
    /**
     * The available Orientations for the Sprite
     */
    orientations: CharaterSpriteOrientations;
    /**
     * The number updates until the next frame should be displayed
     */
    ticksPerFrame?: number;
}

export interface CharaterSpriteOrientations {
    /**
     * Standing Character Sprite Positions
     */
    standing: {
        /**
         * Standing Character Sprite Positions from front
         */
        front: {
            /**
             * Standing Character Sprite Positions from front left
             */
            left: SpritePosition[];
            /**
             * Standing Character Sprite Positions from front right
             */
            right: SpritePosition[];
        }
        /**
         * Standing Character Sprite Positions from back
         */
        back: {
            /**
             * Standing Character Sprite Positions from back left
             */
            left: SpritePosition[];
            /**
             * Standing Character Sprite Positions from back right
             */
            right: SpritePosition[];
        }
    };
    /**
     * Walking Character Sprite Positions
     */
    walking: {
         /**
         * Walking Character Sprite Positions from front
         */
        front: {
            /**
             * Walking Character Sprite Positions from front left
             */
            left: SpritePosition[];
            /**
             * Walking Character Sprite Positions from front right
             */
            right: SpritePosition[];
        }
        /**
         * Walking Character Sprite Positions from back
         */
        back: {
            /**
             * Walking Character Sprite Positions from back left
             */
            left: SpritePosition[];
            /**
             * Walking Character Sprite Positions from back right
             */
            right: SpritePosition[];
        }
    };
}

/**
 * CharacterSprite
 * ===============
 */
export class CharacterSprite extends Sprite {

    /**
     * The current frame to be displayed
     */
    public frameIndex: number;
    /**
     * The current CharaterSpriteOrientation
     */
    public currentOrientation: SpritePosition[];
    /**
     * The number updates since the current frame was first displayed
     */
    public tickCount: number;
    /**
     * The number updates until the next frame should be displayed
     */
    public ticksPerFrame: number;

    constructor(options: CharacterSpriteOptions) {
        super(options);
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.tickCount = 0;
        this.frameIndex = 0;
        this.currentOrientation = options.orientations.standing.front.right;
    }

    /**
     * Updates the sprite to display in current orientation
     */
    public update(): void {
        this.tickCount ++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            // Go to the next frame
            this.frameIndex += 1;
            if (this.frameIndex >= this.currentOrientation.length) {
                this.frameIndex = 0;
            }

            this.render(this.currentOrientation[this.frameIndex]);
        }
    }
}
