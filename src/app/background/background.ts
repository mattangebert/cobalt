import { Terrain } from './terrain-list';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../services/config.service';


export interface BackgroundOptions {
    /**
     * The context
     */
    context: CanvasRenderingContext2D;
    /**
     * The base terrain
     */
    baseTerrain: Terrain;
    /**
     * The base terrain image url
     */
    baseTerrainImage: HTMLImageElement;
}

/**
 * Background
 * ==========
 */
export class Background {
    /**
     * Canvas Context to be drawn on
     */
    private ctx: CanvasRenderingContext2D;
    /**
     * The base terrain
     */
    private baseTerrain: Terrain;
    /**
     * The sprite canvas images
     */
    public image: HTMLImageElement;

    constructor(options: BackgroundOptions) {
        this.ctx = options.context;
        this.baseTerrain = options.baseTerrain;
        this.image = options.baseTerrainImage;
    }

    /**
     * Render the base terrain
     */
    private renderBaseTerrain(): void {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.baseTerrain.width  * 4;
        offscreenCanvas.height = this.baseTerrain.height * 4;

        const offscreenContext = offscreenCanvas.getContext('2d');
        const position = this.baseTerrain.forms.full;

        offscreenContext.drawImage(
            this.image,
            ( position.column - 1 ) * this.baseTerrain.width,
            ( position.row - 1 ) * this.baseTerrain.height,
            this.baseTerrain.width,
            this.baseTerrain.height,
            0,
            0,
            this.baseTerrain.width * 4,
            this.baseTerrain.width * 4
        );

        const pattern = this.ctx.createPattern(offscreenCanvas, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    }

     /**
     * Render the sprite onto canvas context
     */
    public render(): void {

        this.renderBaseTerrain();

    }

}
