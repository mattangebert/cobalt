import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CharacterSprite, CharacterSpriteOptions } from '../character/character-sprite';
import { characterlist } from '../character/character-list';
import { KeyHandlerService } from '../services/key-handler.service';

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
  private sprite: any;

  constructor(private keyHandler: KeyHandlerService) { }

  /**
   * initalise canvas context
   */
  public ngOnInit(): void {
    this.ctx = this.canvasElement.nativeElement.getContext('2d');
  }

  /**
   * Animate   // todo replace with better name
   */
  public animate(): void {
        /**
     * The sprite image as HtmlImage
     */
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
    this.sprite = new CharacterSprite(options);

    this.sprite.render();
  }

  /**
   * start game loop
   */
  public start(): void {
    this.interval = setInterval(() => {
      this.sprite.update();
    }, 1 / 60);
  }
}
