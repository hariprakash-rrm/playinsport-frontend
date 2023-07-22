import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { TokenComponent } from './components/token-component/token/token.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { HomeComponent } from './components/home-component/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'token',
    component: TokenComponent
  },
  {
    path:'wallet',
    component:WalletComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
