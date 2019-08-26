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
     * The width
     */
    public width: number;
    /**
     * The height
     */
    public height: number;
    /**
     * The sprite canvas images
     */
    public image: HTMLImageElement;

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
        const dx = (400 - this.width / 2); // todo replace
        const dy = (300 - this.height / 2); // todo replace

        this.ctx.clearRect(dx, dy, this.width, this.height);

        this.ctx.drawImage(
            this.image,
            ( position.column - 1 ) * this.width,
            ( position.row - 1 ) * this.height,
            this.width,
            this.height,
            dx,
            dy,
            this.width,
            this.height
        );
    }
}
