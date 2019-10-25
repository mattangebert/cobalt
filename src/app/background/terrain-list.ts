import { SpritePosition } from '../sprite/sprite';

export interface Terrain {
     /**
     * The terrain name
     */
    name: string;
    /**
     * The terrain sprite url path
     */
    image: string;
    /**
     * the terrain forms
     */
    forms: TerrainForm;
    /**
     * How many animation rows there are <2 => no animation
     */
    animationRowCount?: number;
    /**
     * The width of one terrain form on the sprite
     */
    width: number;
    /**
     * The height of one terrain form on the sprite
     */
    height: number;
}

interface TerrainForm {
    /**
     * full
     */
    full: SpritePosition;
    /**
     * corner
     */
    corner: SpritePosition;
    /**
     * horizontal
     */
    horizontal: SpritePosition;
    /**
     * vertical
     */
    vertical: SpritePosition;
    /**
     * dot
     */
    dot: SpritePosition;
}


export const terrainlist: Terrain[] = [
    {
        name: 'dirt_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Dirt1_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'dirt_2',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Dirt2_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'dirt_3',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Dirt3_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'dirt_4',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Dirt4_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'grass_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Grass1_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'grass_2',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Grass2_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'grass_3',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Grass3_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'grass_4',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Grass4_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'flower_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Flower_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'ice_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Ice1_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'ice_2',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Ice2_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'lava_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Lava_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 6,
        width: 16,
        height: 16
    },
    {
        name: 'long-grass_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]LongGrass_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'moss_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Moss_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'snow_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Snow_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        width: 16,
        height: 16
    },
    {
        name: 'water_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water1_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    {
        name: 'water_2',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water2_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    {
        name: 'water_3',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water3_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    {
        name: 'water_4',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water4_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    {
        name: 'water_5',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water5_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    {
        name: 'water_6',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water6_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 2,
        width: 16,
        height: 16
    },
    /** Water 7 ist special should adjust later*/
    {
        name: 'water_7',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]Water7_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 4,
        width: 16,
        height: 16
    },
    {
        name: 'waterfall_1',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]WaterFall1_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 4,
        width: 16,
        height: 16
    },
    {
        name: 'waterfall_2',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]WaterFall2_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 4,
        width: 16,
        height: 16
    },
    {
        name: 'waterfall_3',
        image: 'assets/Pipoya RPG Tileset/[A]_type1/[A]WaterFall3_pipo.png',
        forms: {
            full: {column: 1, row: 5},
            corner: {column: 1, row: 4},
            horizontal: {column: 1, row: 3},
            vertical: {column: 1, row: 2},
            dot: {column: 1, row: 1}
        },
        animationRowCount: 4,
        width: 16,
        height: 16
    },

];
