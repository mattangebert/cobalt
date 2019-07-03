import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvasElement: ElementRef

  public width: number = 800;
  public height: number = 600;

  private context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.context = this.canvasElement.nativeElement.getContext('2d');

    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, this.width, this.height);
    
  }

}
