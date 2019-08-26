import { CharacterSpriteOptions } from './character-sprite';

interface Character {
    /**
     * The characters name
     */
    name: string;
    /**
     * The characters sprite url path
     */
    image: string;
    /**
     * The characters SpriteOptions
     */
    orientation: CharacterSpriteOptions['orientations'];
    /**
     * The width of the character on the sprite
     */
    width: number;
    /**
     * The height of the character on the sprite
     */
    height: number;
}

export const characterlist: Character[] = [
    {
        name: 'Knight',
        image: 'assets/rouguelike_tilesets/Character Sheets/Knight.png',
        orientation: {
            standing: {
              front: {
               left: [
                 {column: 8, row: 1},
                 {column: 4, row: 1}
               ],
               right: [
                 {column: 7, row: 1},
                 {column: 1, row: 1}
               ]
              },
              back: {
               left: [
                 {column: 4, row: 2}
               ],
               right: [
                 {column: 1, row: 2}
               ]
              }
            },
            walking: {
             front: {
              left: [
                {column: 5, row: 1},
                {column: 6, row: 1}
              ],
              right: [
                {column: 2, row: 1},
                {column: 3, row: 1}
              ]
             },
             back: {
              left: [
                {column: 5, row: 2},
                {column: 6, row: 2}
              ],
              right: [
                {column: 2, row: 2},
                {column: 3, row: 2}
              ]
             }
           }
        },
        width: 32,
        height: 32
    }
];
