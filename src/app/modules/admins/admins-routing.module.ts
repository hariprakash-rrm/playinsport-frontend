import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { TokenComponent } from './token/token.component';


const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'wallet',
    component: GameComponent
  },
  {
    path: 'token',
    component: TokenComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
