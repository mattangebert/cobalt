import { NgModule } from '@angular/core';
import { PongComponent } from './pong.component';
import { RouterModule } from '@angular/router';
import { FormOptionModule } from '../form-option/form-option.module';

@NgModule({
  declarations: [PongComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: PongComponent }
    ]),
    FormOptionModule
  ],
  exports: [PongComponent]
})
export class PongModule { }
