import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

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
  private context: CanvasRenderingContext2D;

  constructor() { }

  /**
   * initalise canvas context
   */
  public ngOnInit(): void {
    this.context = this.canvasElement.nativeElement.getContext('2d');

    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
