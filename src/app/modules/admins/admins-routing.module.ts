import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { TokenComponent } from './token/token.component';
import { CouponComponent } from './coupon/coupon.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { MatchComponent } from './exchange/components/match/match.component';


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
  },
  {
    path: 'create-coupon',
    component: CouponComponent
  },
  {
    path:'exchange',
    component:ExchangeComponent
  },
  {
    path:'exchange/match',
    component:MatchComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
