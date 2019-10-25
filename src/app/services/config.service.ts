import { Injectable } from '@angular/core';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const CHAR_WIDHT = 45;
export const CHAR_HEIGHT = 45;
export const TILE_WIDHT = CHAR_WIDHT + 5;
export const TILE_HEIGHT = CHAR_HEIGHT + 5;

/**
 * ConfigService
 * =============
 */
@Injectable({
    providedIn: 'root',
})
export class ConfigService {
}
