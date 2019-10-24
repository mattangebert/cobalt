import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CharacterSprite, CharacterSpriteOptions } from '../character/character-sprite';
import { characterlist } from '../character/character-list';
import { KeyHandlerService, CharacterMovement, DEFAULT_CHAR_MOVMENT } from '../services/key-handler.service';
import { distinctUntilChanged } from 'rxjs/operators';

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
  public width = 800;
  /**
   * Height of Canvas
   */
  public height = 600;

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
  private currentCharacterMovement: CharacterMovement = DEFAULT_CHAR_MOVMENT;

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

    const knight = characterlist.find(x => x.name === 'Knight');
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
    this.interval = setInterval(() => {
      this.keyHandler.charMovement.pipe(
        distinctUntilChanged(this.handleCharacterMovmement.bind(this))
      ).subscribe();
      /*
      this.keyHandler.charMovement.subscribe({
        next(e: any): void { console.log(e); },
      });
      */
      // this.handleCharacterMovmement.bind(this)
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

    // char doesnt move
    if (movment.up === movment.down && movment.left === movment.right) {
      this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.right;

      if (this.currentCharacterMovement.left && !this.currentCharacterMovement.right) {
        this.sprite.currentOrientation = this.spriteOptions.orientations.standing.front.left;
      }

      if (this.currentCharacterMovement.up) {
        this.sprite.currentOrientation = this.spriteOptions.orientations.standing.back.right;
        if (this.currentCharacterMovement.left && !this.currentCharacterMovement.right) {
          this.sprite.currentOrientation = this.spriteOptions.orientations.standing.back.left;
        }
      }
    }

    this.currentCharacterMovement = movment;
  }
}
