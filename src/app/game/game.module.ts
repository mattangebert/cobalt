import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';

/**
 * Module holding gameComponent
 */
@NgModule({
  declarations: [GameComponent],
  exports: [GameComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: GameComponent }
    ])
  ]
})
export class GameModule { }
