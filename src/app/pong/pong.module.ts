import { NgModule } from '@angular/core';
import { PongComponent } from './pong.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PongComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: PongComponent }
    ])
  ],
  exports: [PongComponent]
})
export class PongModule { }