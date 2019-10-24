import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CharacterSprite, CharacterSpriteOptions } from '../character/character-sprite';
import { characterlist } from '../character/character-list';
import { KeyHandlerService, CharacterMovement, DEFAULT_CHAR_MOVMENT } from '../services/key-handler.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

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
   * Width of Canvas
   */
  public width = CANVAS_WIDTH;
  /**
   * Height of Canvas
   */
  public height = CANVAS_HEIGHT;

  /**
   * Canvas Context to be drawn on
   */
  private ctx: CanvasRenderingContext2D;
  /**
   * Interval to handle game loop
   */
  private interval: NodeJS.Timer;
  /**
   * remove me
   */
  private sprite: CharacterSprite;
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
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
    this.initaliseCharacter();
    setTimeout(() => {
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
      context: this.ctx,
      width: knight.width,
      height: knight.height,
      image: image
    };
    this.spriteOptions = options;
    this.sprite = new CharacterSprite(options);
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
