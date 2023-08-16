import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { TokenComponent } from './token/token.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'token',
    component: TokenComponent
  }
  ,{
    path:'qr',
    component:QrCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
