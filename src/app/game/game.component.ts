import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CharacterSprite, CharacterSpriteOptions } from '../character/character-sprite';
import { characterlist } from '../character/character-list';
import { KeyHandlerService, CharacterMovement, DEFAULT_CHAR_MOVMENT } from '../services/key-handler.service';
import { debounceTime } from 'rxjs/operators';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../services/config.service';
import { Background, BackgroundOptions } from '../background/background';
import { terrainlist } from '../background/terrain-list';

/**
 * Component to create a Game
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  /**
   * Html Canvas References
   */
  @ViewChild('gameCanvas', { static: true }) public canvasElement: ElementRef;
  /**
   * Html Canvas References
   */
  @ViewChild('gameCanvasLayerOne', { static: true }) public canvasLayerOne: ElementRef;
  /**
   * Html Canvas References
   */
  @ViewChild('gameCanvasLayerTwo', { static: true }) public canvasLayerTwo: ElementRef;

  /**
   * Width of Canvas
   */
  public width = CANVAS_WIDTH;
  /**
   * Height of Canvas
   */
  public height = CANVAS_HEIGHT;
  /**
   * CThe game layers
   */
  private gameLayers: {
    /**
     * gameCanvas context
     */
    'ctx': CanvasRenderingContext2D,
    /**
     * layerOne context
     */
    'layerOne': CanvasRenderingContext2D,
    /**
     * layerTwo context
     */
    'layerTwo': CanvasRenderingContext2D
  };
  /**
   * Interval to handle game loop
   */
  private interval: NodeJS.Timer;
  /**
   * remove me
   */
  private sprite: CharacterSprite;
  /**
   * remove me too
   */
  private background: Background;
  /**
   * The options for the sprite
   */
  private spriteOptions: CharacterSpriteOptions;
  /**
   * The current character movement
   */
  private currentCharacterMovement: CharacterMovement = Object.assign({}, DEFAULT_CHAR_MOVMENT);

  constructor(public keyHandler: KeyHandlerService) { }

  /**
   * initalise canvas context
   */
  public ngOnInit(): void {
    this.gameLayers = {
      'ctx': this.canvasElement.nativeElement.getContext('2d'),
      'layerOne': this.canvasLayerOne.nativeElement.getContext('2d'),
      'layerTwo': this.canvasLayerTwo.nativeElement.getContext('2d'),
    };

    this.gameLayers.ctx.globalAlpha = 0.0;
    this.initaliseBackground();
    this.initaliseCharacter();
    setTimeout(() => {
      this.background.render();
      this.sprite.render();
  }, 500);
  }

  /**
   * initialises the character model
   */
  private initaliseCharacter(): void {
    const image = new Image();

    const knight = characterlist.find(x => x.name === 'Knight'); // todo char picker
    image.src = knight.image;
    const options: CharacterSpriteOptions = {
      orientations: knight.orientation,
      ticksPerFrame: 100,
      context: this.gameLayers.ctx,
      width: knight.width,
      height: knight.height,
      image: image
    };
    this.spriteOptions = options;
    this.sprite = new CharacterSprite(options);
  }

  /**
   * intiialises the background model
   */
  private initaliseBackground(): void {
    const image = new Image();

    const baseTerrain = terrainlist.find(x => x.name === 'grass_1');
    image.src = baseTerrain.image;

    const options: BackgroundOptions = {
      context: this.gameLayers.layerTwo,
      baseTerrain: baseTerrain,
      baseTerrainImage: image
    };

    this.background =  new Background(options);
  }

  /**
   * start game loop
   */
  public start(): void {
    this.keyHandler.charMovement.pipe(
      debounceTime(100)
    ).subscribe(
      this.handleCharacterMovmement.bind(this)
      );
    this.interval = setInterval(() => {
      this.sprite.update();
    }, 1 / 60);
  }

  /**
   * Handles the chars movmement
   * @param movment The characters movement
   */
  private handleCharacterMovmement(movment: CharacterMovement): void  {
    // char moves up
    if (movment.up && !movment.down && !movment.left && !movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.back.right;
    }

    // char moves down
    if (!movment.up && movment.down && !movment.left && !movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.front.right;
    }

    // char moves left
    if (!movment.up && !movment.down && movment.left && !movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.front.left;
    }

    // char moves right
    if (!movment.up && !movment.down && !movment.left && movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.front.right;
    }

    // char moves up right
    if (movment.up && !movment.down && !movment.left && movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.back.right;
    }

    // char moves up left
    if (movment.up && !movment.down && movment.left && !movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.back.left;
    }

    // char moves down right
    if (!movment.up && movment.down && !movment.left && movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.front.right;
    }

    // char moves down left
    if (!movment.up && movment.down && movment.left && !movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.walking.front.left;
    }

    // char doesnt move (stands)
    if (movment.up === movment.down && movment.left === movment.right) {
      if (this.currentCharacterMovement.up && !this.currentCharacterMovement.down) {
        // did move up
        if (this.currentCharacterMovement.left && !this.currentCharacterMovement.right) {
          // moved left
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.back.left;
        }
        if (!this.currentCharacterMovement.left && this.currentCharacterMovement.right) {
          // moved right
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.back.right;
        }
        if (this.currentCharacterMovement.left === this.currentCharacterMovement.right) {
          // moved straight
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.back.right;
        }
      }
      if (!this.currentCharacterMovement.up && this.currentCharacterMovement.down) {
        // did move down
        if (this.currentCharacterMovement.left && !this.currentCharacterMovement.right) {
          // moved left
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.left;
        }
        if (!this.currentCharacterMovement.left && this.currentCharacterMovement.right) {
          // moved right
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.right;
        }
        if (this.currentCharacterMovement.left === this.currentCharacterMovement.right) {
          // moved straight
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.right;
        }
      }
      if (this.currentCharacterMovement.up === this.currentCharacterMovement.down) {
        // moved left or right but not up or down
        if (this.currentCharacterMovement.left && !this.currentCharacterMovement.right) {
          // moved left
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.left;
        }
        if (!this.currentCharacterMovement.left && this.currentCharacterMovement.right) {
          // moved right
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.right;
        }
      }
    }
    this.currentCharacterMovement = {...movment};
  }
}
