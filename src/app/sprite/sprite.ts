import { CANVAS_WIDTH, CANVAS_HEIGHT, CHAR_WIDHT, CHAR_HEIGHT } from '../services/config.service';

export interface SpriteOptions {
    /**
     * The context
     */
    context: CanvasRenderingContext2D;
    /**
     * The width
     */
    width: number;
    /**
     * The height
     */
    height: number;
    /**
     * The image url path
     */
    image: HTMLImageElement;
}

export interface SpritePosition {
    /**
     * The column position
     */
    column: number;
    /**
     * The row position
     */
    row: number;
}

/**
 * Sprite
 * ======
 */
export class Sprite {
    /**
     * The context
     */
    public ctx: CanvasRenderingContext2D;
    /**
     * The sprite width
     */
    public width: number;
    /**
     * The sprite height
     */
    public height: number;
    /**
     * The sprite canvas images
     */
    public image: HTMLImageElement;
    /**
     * The Sprites width on canvas
     */
    private SPRITE_WIDTH: number = CHAR_WIDHT;
    /**
     * The sprites height on cavas
     */
    private SPIRTE_HEIGHT: number = CHAR_WIDHT;

    constructor(options: SpriteOptions) {
        this.ctx = options.context;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
    }

    /**
     * Render the sprite onto canvas context
     */
    public render(position: SpritePosition = {column: 1, row: 1}): void {
        const dx = (CANVAS_WIDTH / 2 -  this.SPRITE_WIDTH / 2);
        const dy = (CANVAS_HEIGHT / 2 - this.SPIRTE_HEIGHT / 2);

        this.ctx.clearRect(dx, dy, this.SPRITE_WIDTH, this.SPIRTE_HEIGHT);

        this.ctx.drawImage(
            this.image,
            ( position.column - 1 ) * this.width,
            ( position.row - 1 ) * this.height,
            this.width,
            this.height,
            dx,
            dy,
            this.SPRITE_WIDTH,
            this.SPIRTE_HEIGHT
        );
    }
}
