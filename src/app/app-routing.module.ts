import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule),
  },
  { 
    path: 'pong',
    loadChildren: () => import('./pong/pong.module').then(m => m.PongModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
